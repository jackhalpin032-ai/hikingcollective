import { useAutoAnimate as useAutoAnimateBase } from '@formkit/auto-animate/react';
import type { AutoAnimateOptions } from '@formkit/auto-animate';

// Re-export with sensible defaults for the app
export function useAutoAnimate(options?: Partial<AutoAnimateOptions>) {
  return useAutoAnimateBase({
    duration: 250,
    easing: 'ease-out',
    ...options,
  });
}
