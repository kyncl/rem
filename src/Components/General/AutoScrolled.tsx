import React, { cloneElement, useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

interface AnimationData {
    scroll: number; // current scroll value
    elementWidth: number; // width of the inside element
    shouldScroll: boolean; // if the inside element is small, no need for scrolling
}

interface AutoScrolledProps extends React.ComponentProps<"div"> {
    element: React.ReactElement<React.ComponentPropsWithRef<"div">>; // here I don't know how to make it dynamic, so div will do
}

const ANIMATION_STEP_MS = 10;
const SCROLLED_GAP_PX = 16;

export const AutoScrolled: React.FC<AutoScrolledProps> = ({ element, className, ...props }) => {
    const scrollBoxRef = useRef<HTMLDivElement | null>(null); // references the scroll container
    const elementRef = useRef<HTMLDivElement | null>(null); // references the inside element

    const [animationData, setAnimationData] = useState<AnimationData | null>(null);

    // Initialize scrolling
    useEffect(() => {
        const scrollBox = scrollBoxRef.current;
        const element = elementRef.current;

        if (scrollBox === null || element === null) return;

        setAnimationData({
            scroll: animationData?.scroll ?? 0,
            elementWidth: element.clientWidth,
            shouldScroll: scrollBox.clientWidth < element.clientWidth,
        });

    }, [scrollBoxRef, elementRef, scrollBoxRef.current?.clientWidth]);

    // Animation loop
    useEffect(() => {
        const loopId = setInterval(() => {
            if (animationData === null) return;

            const moveSpeed = 100; // pixels per seconds

            const deltaTime = ANIMATION_STEP_MS / 1000; // seconds between frames

            const nextAnimationData: AnimationData = { ...animationData };

            // move
            nextAnimationData.scroll += (moveSpeed * deltaTime);

            const loopOffset = animationData.elementWidth + SCROLLED_GAP_PX;
            if (nextAnimationData.scroll > loopOffset) {
                nextAnimationData.scroll -= loopOffset;
            }

            setAnimationData(nextAnimationData);
        }, ANIMATION_STEP_MS);

        return () => {
            clearTimeout(loopId);
        };
    }, [animationData, scrollBoxRef]);

    // Scroll to target position
    useEffect(() => {
        if (animationData === null || scrollBoxRef.current === null) return;

        scrollBoxRef.current.scrollTo({
            behavior: 'instant',
            left: animationData.scroll,
        });
    }, [animationData, scrollBoxRef]);

    // Clone the scrolled element and make sure its block and text doesn't wrap
    const clonedElm = cloneElement(element, {
        ref: elementRef,
        className: cn(element.props.className, 'block text-nowrap'),
    });

    if (animationData === null || !animationData.shouldScroll) {
        return (
            <div
                {...props}
                ref={scrollBoxRef}
                className={cn(
                    className,
                    "overflow-scroll scrollbar-none flex justify-center"
                )}
            >
                {clonedElm}
            </div>
        );
    }

    return (
        <div
            {...props}
            ref={scrollBoxRef}
            className={cn(
                className,
                "overflow-scroll scrollbar-none w-full"
            )}
        >
            <div
                style={{
                    gap: `${SCROLLED_GAP_PX}px`,
                }}
                className="text-nowrap flex"
            >
                {clonedElm}
                {clonedElm}
            </div>
        </div>
    );
};