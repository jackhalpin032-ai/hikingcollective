import { useState } from 'react';
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
      return <StepRouteSelection onContinue={handleContinue} />;
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background"
      >
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 md:px-6 border-b border-border bg-background">
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
              className="rounded-full"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto min-h-[calc(100vh-10rem)]">
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
          </div>
        </main>
      </motion.div>

      <DiscardConfirmDialog
        open={showDiscardDialog}
        onOpenChange={setShowDiscardDialog}
        onContinueEditing={handleContinueEditing}
        onDiscard={handleDiscard}
      />
    </>
  );
}
