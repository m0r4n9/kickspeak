import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './StickyContentLayout.module.scss';
import {memo, ReactElement} from 'react';

interface StickyContentLayoutProps {
    className?: string;
}

interface StickyContentLayoutProps {
    className?: string;
    left?: ReactElement;
    content: ReactElement;
    right?: ReactElement;
    top?: string;
}

export const StickyContentLayout = memo((props: StickyContentLayoutProps) => {
    const { className, left, content, right, top } = props;

    return (
        <div className={classNames(cls.StickyContentLayout, {}, [className])}>
            {left && <div className={cls.left}>{left}</div>}
            <div className={cls.content}>{content}</div>
            {right && <div className={cls.right}>{right}</div>}
        </div>
    );
});
