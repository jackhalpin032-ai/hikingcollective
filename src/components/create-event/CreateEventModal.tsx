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
import { DiscardConfirmDialog } from './DiscardConfirmDialog';
import { ACTIVITIES_WITH_ROUTE } from './types';

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

  // Check if current step is compact (activity or date/time) vs full-width (route selection)
  const isCompactStep = currentStep === 1 || 
    (currentStep === 3) || 
    (currentStep === 2 && formData.activityType && !ACTIVITIES_WITH_ROUTE.includes(formData.activityType));

  // Determine which step to show based on current step and activity type
  const getStepContent = () => {
    if (currentStep === 1) {
      return (
        <StepActivityType
          selectedActivity={formData.activityType}
          onSelect={(activity) => updateFormData({ activityType: activity })}
          onContinue={handleContinue}
        />
      );
    }
    
    if (currentStep === 2 && formData.activityType && ACTIVITIES_WITH_ROUTE.includes(formData.activityType)) {
      return (
        <StepRouteSelection 
          selectedRouteId={formData.routeId}
          onSelect={(routeId) => updateFormData({ routeId })}
          onContinue={handleContinue} 
        />
      );
    }
    
    // Step 3 or Step 2 for activities without route
    return (
      <StepDateTime
        date={formData.date}
        time={formData.time}
        onDateChange={(date) => updateFormData({ date: date ?? null })}
        onTimeChange={(time) => updateFormData({ time })}
        onContinue={handleContinue}
      />
    );
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
                  ? "inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90vw] md:max-w-2xl md:h-auto md:max-h-[85vh]"
                  : "inset-2 md:inset-4 lg:inset-8"
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
