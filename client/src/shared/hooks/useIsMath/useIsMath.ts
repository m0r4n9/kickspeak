import { useEffect, useState } from 'react';

export function useIsMath() {
    const [isMatch, setIsMatch] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const checkMediaQuery = () => {
        const mediaQuery = window.matchMedia('(max-width: 990px)');
        const isMobileDev = window.matchMedia('(max-width: 499px)');

        setIsMatch(mediaQuery.matches);
        setIsMobile(isMobileDev.matches)
    };

    useEffect(() => {
        checkMediaQuery();

        const resizeHandler = () => {
            checkMediaQuery();
        };

        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    return { isMatch, isMobile };
}
