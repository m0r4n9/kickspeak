import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileHeader.module.scss';
import { memo } from 'react';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import {
    getProfileReadonly,
    profileActions,
} from '@/features/EditProfileCards';
import { useSelector } from 'react-redux';

interface ProfileHeaderProps {
    className?: string;
    saveEdit: () => void;
    cancelEdit: () => void;
}

export const ProfileHeader = memo((props: ProfileHeaderProps) => {
    const { className, saveEdit, cancelEdit } = props;
    const dispatch = useAppDispatch();
    const readonly = useSelector(getProfileReadonly);

    const onEdit = () => {
        dispatch(profileActions.setReadonly(false));
    };

    const onCancelEdit = () => {
        dispatch(profileActions.cancelEdit());
        cancelEdit();
    };

    return (
        <div className={classNames(cls.ProfileHeader, {}, [className])}>
            {readonly ? (
                <Button onClick={onEdit} variant="card" width={200}>
                    Редактировать
                </Button>
            ) : (
                <HStack gap="32">
                    <Button
                        onClick={onCancelEdit}
                        variant="card"
                        fullWidth
                        width={200}
                    >
                        Отмена
                    </Button>
                    <Button
                        onClick={saveEdit}
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
