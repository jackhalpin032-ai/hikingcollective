import { useState, useEffect } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const handleSubmit = () => {
    // For now, just show success and close
    toast.success('Event created successfully!');
    clearFormData();
    onClose();
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
          />
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark backdrop */}
            <motion.div
              key="backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* Modal container */}
            <motion.div
              key="modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={cn(
                "fixed z-50 bg-background rounded-xl shadow-2xl border border-border overflow-hidden flex flex-col",
                isCompactStep
                  ? "left-4 right-4 top-4 bottom-4 md:left-1/2 md:right-auto md:top-1/2 md:bottom-auto md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90vw] md:max-w-2xl md:max-h-[85vh]"
                  : "left-2 right-2 top-2 bottom-2 md:left-4 md:right-4 md:top-4 md:bottom-4 lg:left-8 lg:right-8 lg:top-8 lg:bottom-8"
              )}
            >
              {/* Header */}
              <header className="flex items-center justify-between h-14 px-4 md:px-6 border-b border-border bg-background flex-shrink-0">
                <div className="flex items-center gap-4">
                  {currentStep > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span className="hidden sm:inline">Back</span>
                    </Button>
                  )}
                  <h1 className="text-lg font-semibold text-foreground">Create Event</h1>
                </div>

                <div className="flex items-center gap-4">
                  <StepIndicator currentStep={currentStep} totalSteps={getTotalSteps()} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="rounded-full hover:bg-muted"
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
              </header>

              {/* Content */}
              <main className="flex-1 overflow-auto p-4 md:p-6">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="h-full"
                  >
                    {getStepContent()}
                  </motion.div>
                </AnimatePresence>
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
}
