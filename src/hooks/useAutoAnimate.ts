import { useRef, useEffect, useCallback } from 'react';
import autoAnimate from '@formkit/auto-animate';
import type { AutoAnimateOptions } from '@formkit/auto-animate';

// Stable hook that avoids infinite re-render issues
export function useAutoAnimate<T extends HTMLElement>(options?: Partial<AutoAnimateOptions>) {
  const parentRef = useRef<T | null>(null);
  const animationRef = useRef<ReturnType<typeof autoAnimate> | null>(null);

  const setRef = useCallback((node: T | null) => {
    // Cleanup previous animation if element changed
    if (animationRef.current && parentRef.current !== node) {
      animationRef.current.disable();
      animationRef.current = null;
    }
    
    parentRef.current = node;
    
    if (node && !animationRef.current) {
      animationRef.current = autoAnimate(node, {
        duration: 250,
        easing: 'ease-out',
        ...options,
      });
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.disable();
      }
    };
  }, []);

  return [setRef] as const;
}
