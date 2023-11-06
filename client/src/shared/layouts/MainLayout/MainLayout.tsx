import { classNames } from '@/shared/lib/classNames/classNames.ts';
import cls from './MainLayout.module.scss';
import { memo, ReactElement } from 'react';

interface MainLayoutProps {
    className?: string;
    header: ReactElement;
    content: ReactElement;
    sidebar?: ReactElement;
    toolbar?: ReactElement;
}

export const MainLayout = memo((props: MainLayoutProps) => {
    const { className, content, header, sidebar, toolbar } = props;

    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
            <div className={cls.content}>{content}</div>
            <div className={cls.sidebar}>{sidebar}</div>
            <div className={cls.header}>{header}</div>
        </div>
    );
});
