import { useState, useEffect, useCallback } from 'react';
import { CreateEventFormData, ACTIVITIES_WITH_ROUTE, STORAGE_KEY } from './types';

const INITIAL_FORM_DATA: CreateEventFormData = {
  activityType: null,
  routeId: null,
  date: null,
  time: '',
  eventName: '',
  maxParticipants: null,
};

export function useCreateEventForm() {
  const [formData, setFormData] = useState<CreateEventFormData>(INITIAL_FORM_DATA);
  const [currentStep, setCurrentStep] = useState(1);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Restore date as Date object
        if (parsed.date) {
          parsed.date = new Date(parsed.date);
        }
        setFormData(parsed);
      } catch {
        // Ignore invalid data
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (formData.activityType || formData.date || formData.time || formData.routeId) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  const updateFormData = useCallback((updates: Partial<CreateEventFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const clearFormData = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    localStorage.removeItem(STORAGE_KEY);
    setCurrentStep(1);
  }, []);

  const hasUnsavedChanges = Boolean(
    formData.activityType || formData.date || formData.time || formData.routeId || formData.eventName || formData.maxParticipants
  );

  // Calculate total steps based on activity type
  // With route: Activity(1) → Route(2) → DateTime(3) → Details(4) = 4 steps
  // Without route: Activity(1) → DateTime(2) → Details(3) = 3 steps
  const getTotalSteps = useCallback(() => {
    if (!formData.activityType) return 4;
    return ACTIVITIES_WITH_ROUTE.includes(formData.activityType) ? 4 : 3;
  }, [formData.activityType]);

  // Navigate to next step with logic for skipping route selection
  const goToNextStep = useCallback(() => {
    if (currentStep === 1 && formData.activityType) {
      // If activity doesn't require route selection, skip to date/time
      if (!ACTIVITIES_WITH_ROUTE.includes(formData.activityType)) {
        setCurrentStep(3);
      } else {
        setCurrentStep(2);
      }
    } else {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, formData.activityType]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep === 3 && formData.activityType && !ACTIVITIES_WITH_ROUTE.includes(formData.activityType)) {
      // If we skipped route selection, go back to step 1
      setCurrentStep(1);
    } else {
      setCurrentStep(prev => Math.max(1, prev - 1));
    }
  }, [currentStep, formData.activityType]);

  return {
    formData,
    updateFormData,
    clearFormData,
    hasUnsavedChanges,
    currentStep,
    setCurrentStep,
    getTotalSteps,
    goToNextStep,
    goToPreviousStep,
  };
}
