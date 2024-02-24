import { memo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileHeader.module.scss';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { profileActions } from '../../model/slice/profileSlice';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

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
