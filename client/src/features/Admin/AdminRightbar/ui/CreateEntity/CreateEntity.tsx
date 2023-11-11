import { memo } from 'react';
import cls from './CreateEntity.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteMain } from '@/shared/const/route.ts';

interface CreateEntityProps {
    className?: string;
    createRoute: string;
}

export const CreateEntity = memo((props: CreateEntityProps) => {
    const { className, createRoute } = props;

    return (
        <div className={classNames(cls.CreateEntity, {}, [className])}>
            <AppLink to={createRoute} className={cls.createLink}>
                Создать пользователя
            </AppLink>
        </div>
    );
});