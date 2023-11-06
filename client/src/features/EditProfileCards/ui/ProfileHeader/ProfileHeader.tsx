import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileHeader.module.scss';
import { memo, useCallback } from 'react';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import {
    getProfileReadonly,
    profileActions,
    updateProfile,
} from '@/features/EditProfileCards';
import { useSelector } from 'react-redux';

interface ProfileHeaderProps {
    className?: string;
}

export const ProfileHeader = memo((props: ProfileHeaderProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const readonly = useSelector(getProfileReadonly);

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfile());
    }, [dispatch]);

    const onCloseEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    return (
        <div className={classNames(cls.ProfileHeader, {}, [className])}>
            {readonly ? (
                <Button onClick={onEdit} variant="card" width={200}>
                    Редактировать
                </Button>
            ) : (
                <HStack gap="32">
                    <Button
                        onClick={onCloseEdit}
                        variant="card"
                        fullWidth
                        width={200}
                    >
                        Отмена
                    </Button>
                    <Button
                        onClick={onSave}
                        variant="card"
                        fullWidth
                        width={200}
                    >
                        Сохранить
                    </Button>
                </HStack>
            )}
        </div>
    );
});
