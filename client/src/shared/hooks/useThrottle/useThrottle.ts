import {useCallback, useRef} from "react";

export function useThrottle(callback: (...arg: any[]) => void, delay: number) {
    const throttleRef = useRef(false);

    return useCallback((...args: any[]) => {
        if (!throttleRef.current) {
            callback(...args)
            throttleRef.current = true

            setTimeout(() => {
                throttleRef.current = false;
            }, delay)
        }
    }, [callback, delay])
}
