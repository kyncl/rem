import { useRef, type PointerEvent } from "react";

type SwipeOptions = { onUp?: () => void; onDown?: () => void; threshold?: number };

export const useSwipe = ({ onUp, onDown, threshold = 40 }: SwipeOptions) => {
    const startY = useRef<number | null>(null);

    return {
        onPointerDown: (e: PointerEvent) => {
            startY.current = e.clientY;
        },
        onPointerUp: (e: PointerEvent) => {
            if (startY.current === null) return;
            const dy = e.clientY - startY.current;
            startY.current = null;
            if (dy < -threshold) onUp?.();
            else if (dy > threshold) onDown?.();
        },
        onPointerCancel: () => {
            startY.current = null;
        },
    };
};
