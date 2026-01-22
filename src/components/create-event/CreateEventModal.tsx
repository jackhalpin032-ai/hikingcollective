import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCreateEventForm } from './useCreateEventForm';
import { StepIndicator } from './StepIndicator';
import { StepActivityType } from './StepActivityType';
import { StepRouteSelection } from './StepRouteSelection';
import { StepDateTime } from './StepDateTime';
import { StepEventDetails } from './StepEventDetails';
import { DiscardConfirmDialog } from './DiscardConfirmDialog';
import { ACTIVITIES_WITH_ROUTE } from './types';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { irishRoutes } from '@/data/routes';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export function CreateEventModal({ isOpen, onClose }: CreateEventModalProps) {
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    formData,
    updateFormData,
    clearFormData,
    hasUnsavedChanges,
    currentStep,
    getTotalSteps,
    goToNextStep,
    goToPreviousStep,
  } = useCreateEventForm();

  // Disable background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowDiscardDialog(true);
    } else {
      onClose();
    }
  };

  const handleDiscard = () => {
    clearFormData();
    setShowDiscardDialog(false);
    onClose();
  };

  const handleContinueEditing = () => {
    setShowDiscardDialog(false);
  };

  const handleBack = () => {
    setDirection(-1);
    goToPreviousStep();
  };

  const handleContinue = () => {
    setDirection(1);
    goToNextStep();
  };

  const handleSubmit = async () => {
    if (!formData.date || !formData.time || !formData.eventName || !formData.activityType) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get route details if a route was selected
      const selectedRoute = formData.routeId 
        ? irishRoutes.find(r => r.id === formData.routeId) 
        : null;

      // Format date for database
      const eventDate = format(formData.date, 'yyyy-MM-dd');
      const dateLabel = format(formData.date, 'EEE, MMM d');

      // Build the event record
      const eventRecord = {
        title: formData.eventName,
        activity: formData.activityType,
        event_date: eventDate,
        date_label: dateLabel,
        time: formData.time === 'TBC' ? 'TBC' : formData.time,
        route_id: formData.routeId,
        available_spots: formData.maxParticipants,
        // Use route data if available, otherwise use sensible defaults
        difficulty: selectedRoute?.difficulty || 'moderate',
        distance: selectedRoute ? `${selectedRoute.distance} km` : 'TBD',
        duration: selectedRoute ? `${Math.round(selectedRoute.duration / 60)}h` : 'TBD',
        elevation: selectedRoute?.technicality || 'N/A',
        departure_location: selectedRoute?.location || 'TBD',
        transport_method: 'Carpool',
        organizer: 'You',
        image: selectedRoute?.thumbnail || 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
        attendees: 0,
        is_past: false,
      };

      const { error } = await supabase.from('events').insert(eventRecord);

      if (error) {
        console.error('Error creating event:', error);
        toast.error('Failed to create event. Please try again.');
        return;
      }

      toast.success('Event created successfully! 🎉');
      clearFormData();
      onClose();
    } catch (err) {
      console.error('Error creating event:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if activity requires route selection
  const requiresRoute = formData.activityType && ACTIVITIES_WITH_ROUTE.includes(formData.activityType);
  
  // Determine the actual step type based on activity
  // With route: 1=Activity, 2=Route, 3=DateTime, 4=Details
  // Without route: 1=Activity, 2=DateTime, 3=Details
  const getLogicalStep = () => {
    if (currentStep === 1) return 'activity';
    if (requiresRoute) {
      if (currentStep === 2) return 'route';
      if (currentStep === 3) return 'datetime';
      if (currentStep === 4) return 'details';
    } else {
      if (currentStep === 2) return 'datetime';
      if (currentStep === 3) return 'details';
    }
    return 'activity';
  };

  const logicalStep = getLogicalStep();
  
  // Check if current step is compact vs full-width (route selection is full-width)
  const isCompactStep = logicalStep !== 'route';

  // Determine which step to show based on logical step
  const getStepContent = () => {
    switch (logicalStep) {
      case 'activity':
        return (
          <StepActivityType
            selectedActivity={formData.activityType}
            onSelect={(activity) => updateFormData({ activityType: activity })}
            onContinue={handleContinue}
          />
        );
      case 'route':
        return (
          <StepRouteSelection 
            selectedRouteId={formData.routeId}
            onSelect={(routeId) => updateFormData({ routeId })}
            onContinue={handleContinue}
            onBack={handleBack}
          />
        );
      case 'datetime':
        return (
          <StepDateTime
            date={formData.date}
            time={formData.time}
            onDateChange={(date) => updateFormData({ date: date ?? null })}
            onTimeChange={(time) => updateFormData({ time })}
            onContinue={handleContinue}
            onBack={handleBack}
          />
        );
      case 'details':
        return (
          <StepEventDetails
            eventName={formData.eventName}
            maxParticipants={formData.maxParticipants}
            onEventNameChange={(eventName) => updateFormData({ eventName })}
            onMaxParticipantsChange={(maxParticipants) => updateFormData({ maxParticipants })}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              style={{ zIndex: 9998 }}
              onClick={handleClose}
            />
            
            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 flex flex-col bg-background"
              style={{ zIndex: 9999 }}
            >
              {/* Header */}
              <header className="flex items-center justify-between h-14 px-4 md:px-6 bg-muted border-b border-border flex-shrink-0">
                <div className="flex items-center gap-4">
                  {currentStep > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleBack}
                      className="h-8 w-8"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span className="sr-only">Back</span>
                    </Button>
                  )}
                  <StepIndicator currentStep={currentStep} totalSteps={getTotalSteps()} />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="rounded-full h-9 w-9 bg-background hover:bg-muted border border-border"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </header>

              {/* Content */}
              <main className="flex-1 overflow-auto">
                <div className={cn(
                  "mx-auto p-6 md:p-8 lg:p-12",
                  isCompactStep ? "max-w-2xl" : "max-w-full"
                )}>
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                      {getStepContent()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </main>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <DiscardConfirmDialog
        open={showDiscardDialog}
        onOpenChange={setShowDiscardDialog}
        onContinueEditing={handleContinueEditing}
        onDiscard={handleDiscard}
      />
    </>
  );

  return createPortal(modalContent, document.body);
}
