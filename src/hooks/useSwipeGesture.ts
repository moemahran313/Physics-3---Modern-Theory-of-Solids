import { useRef, useState, useEffect, useCallback } from "react";

interface SwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  minDistance?: number;
  thresholdRatio?: number;
  disabled?: boolean;
}

export function useSwipeGesture({
  onSwipeLeft,
  onSwipeRight,
  minDistance = 50,
  thresholdRatio = 1.3,
  disabled = false,
}: SwipeGestureOptions) {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const [swipeFeedback, setSwipeFeedback] = useState<"left" | "right" | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent | TouchEvent) => {
    if (disabled) return;
    const touch = e.touches[0];
    if (!touch) return;

    // Don't intercept swipe if starting inside an intentionally scrollable sub-element
    // or input element
    const target = e.target as HTMLElement | null;
    if (target) {
      const scrollableChild = target.closest(".overflow-x-auto, input, textarea, select, button");
      if (scrollableChild && scrollableChild !== e.currentTarget) {
        // If it's a code or math box that is actually scrollable horizontally
        if (scrollableChild.scrollWidth > scrollableChild.clientWidth) {
          // Allow the child to scroll horizontally
          touchStartRef.current = null;
          return;
        }
      }
    }

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  }, [disabled]);

  const handleTouchEnd = useCallback((e: React.TouchEvent | TouchEvent) => {
    if (disabled || !touchStartRef.current) return;
    const touch = e.changedTouches[0];
    if (!touch) return;

    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;

    touchStartRef.current = null;

    // Check if horizontal movement is dominant (avoid triggering on vertical scroll)
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX >= minDistance && absX > absY * thresholdRatio && deltaTime < 800) {
      if (deltaX < 0) {
        // Swiped left (touch moved right-to-left) -> advance to next
        setSwipeFeedback("left");
        onSwipeLeft?.();
      } else {
        // Swiped right (touch moved left-to-right) -> retreat to previous
        setSwipeFeedback("right");
        onSwipeRight?.();
      }

      setTimeout(() => {
        setSwipeFeedback(null);
      }, 400);
    }
  }, [disabled, minDistance, thresholdRatio, onSwipeLeft, onSwipeRight]);

  return {
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
    },
    swipeFeedback,
  };
}
