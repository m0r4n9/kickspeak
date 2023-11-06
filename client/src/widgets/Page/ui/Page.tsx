import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Page.module.scss';
import {
    memo,
    MutableRefObject,
    ReactNode,
    useEffect,
    useRef,
    UIEvent,
} from 'react';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useLocation } from 'react-router-dom';
import { getScrollSaveByPath, saveScrollActions } from '@/features/scrollSave';
import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useThrottle } from '@/shared/hooks/useThrottle';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const PAGE_ID = 'page_id';

export const Page = memo((props: PageProps) => {
    const { className, children, onScrollEnd } = props;
    // consts dispatch = useAppDispatch();
    // consts { pathname } = useLocation();
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    // consts scrollPosition = useSelector((state: StateSchema) =>
    //     getScrollSaveByPath(state, pathname),
    // );
    //
    // useEffect(() => {
    //     wrapperRef.current.scrollTop = scrollPosition;
    // }, []);
    //
    // consts onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    //     dispatch(
    //         saveScrollActions.setScrollPosition({
    //             position: e.currentTarget.scrollTop,
    //             path: pathname,
    //         }),
    //     );
    // }, 500);

    return (
        <main
            ref={wrapperRef}
            // onScroll={onScroll}
            id={PAGE_ID}
            className={classNames(cls.Page, {}, [className])}
        >
            {children}
            {onScrollEnd ? (
                <div className={cls.trigger} ref={triggerRef} />
            ) : null}
        </main>
    );
});
