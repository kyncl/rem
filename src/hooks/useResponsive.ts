import { useEffect, useState } from 'react';

const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        const listener = () => setMatches(media.matches);
        listener();
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
};

interface Responsive {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

/**
 * Provides information about the current screen size.
 *
 * Sizes [px]:
 * - mobile: ...639
 * - tablet: 640...1023
 * - desktop: 1024...
 */
export const useResponsive = (): Responsive => {
    const isMobile = useMediaQuery('(max-width: 639px)');
    const isTablet = useMediaQuery(
        '(min-width: 640px) and (max-width: 1023px)',
    );
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    return { isMobile, isTablet, isDesktop };
};
