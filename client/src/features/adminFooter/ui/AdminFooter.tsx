import {memo, useCallback, useState} from 'react';
import cls from './AdminFooter.module.scss';
import {HStack} from '@/shared/ui/Stack';
import {Button} from '@/shared/ui/Button';
import {Modal} from '@/shared/ui/Modal';
import {classNames} from '@/shared/lib/classNames/classNames.ts';

interface AdminFooterProps {
    className?: string;
    onCancelEdit?: () => void;
    onUpdateUser?: () => void;
    onDeleteUser?: () => void;
}

export const AdminFooter = memo((props: AdminFooterProps) => {
    const {className, onCancelEdit, onUpdateUser, onDeleteUser} = props;
    const [modalOpen, setModalOpen] = useState(false);

    const onCloseModal = useCallback(() => {
        setModalOpen(false);
    }, [])

    const handleDeleteUser = () => {
        onDeleteUser?.();
        setModalOpen(false);
    }

    return (
        <HStack
            max
            justify="between"
            className={classNames(cls.AdminFooter, {}, [className])}
        >
            <div className={cls.leftSide}>
                <Modal isOpen={modalOpen} onClose={onCloseModal}>
                    <div className={cls.modalContent}>
                        <h3 className={cls.modalTitle}>
                            Вы уверены, что хотите удалить пользователя?
                        </h3>
                        <HStack
                            justify="center"
                            gap="24"
                            className={cls.wrapperButton}
                        >
                            <Button
                                onClick={handleDeleteUser}
                                style={{borderColor: 'red'}}
                                variant="border"
                            >
                                Удалить
                            </Button>
                            <Button onClick={onCloseModal} variant="border">
                                Отмена
                            </Button>
                        </HStack>
                    </div>
                </Modal>
                <Button
                    variant="border"
                    onClick={() => setModalOpen(true)}
                    className={cls.button}
                >
                    Удалить
                </Button>
            </div>
            <div>
                <Button
                    variant="border"
                    onClick={onUpdateUser}
                    className={cls.button}
                    style={{borderColor: 'green'}}
                >
                    Сохранить
                </Button>
                <Button
                    variant="border"
                    onClick={onCancelEdit}
                    className={cls.button}
                    style={{borderColor: 'red', marginLeft: 20}}
                >
                    Отменить
                </Button>
            </div>
        </HStack>
    );
});
