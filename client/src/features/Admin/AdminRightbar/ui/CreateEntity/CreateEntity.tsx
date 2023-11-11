import { memo } from 'react';
import cls from './CreateEntity.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteMain } from '@/shared/const/route.ts';

interface CreateEntityProps {
    className?: string;
    createRoute: string;
    entityName?: string;
}

export const CreateEntity = memo((props: CreateEntityProps) => {
    const { className, createRoute, entityName } = props;

    return (
        <div className={classNames(cls.CreateEntity, {}, [className])}>
            <AppLink to={createRoute} className={cls.createLink}>
                Добавить {entityName}
            </AppLink>
        </div>
    );
});
