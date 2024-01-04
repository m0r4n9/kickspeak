import { memo, useCallback, useState } from 'react';
import cls from './AdminFooter.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { Modal } from '@/shared/ui/Modal';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { Button, Flex } from 'antd';

interface AdminFooterProps {
    className?: string;
    onCancelEdit?: () => void;
    onUpdate?: () => void;
    onDelete?: () => void;
}

export const AdminFooter = memo((props: AdminFooterProps) => {
    const { className, onCancelEdit, onUpdate, onDelete } = props;
    const [modalOpen, setModalOpen] = useState(false);

    const onCloseModal = useCallback(() => {
        setModalOpen(false);
    }, []);

    const handleDeleteItem = () => {
        onDelete?.();
        setModalOpen(false);
    };

    return (
        <HStack
            max
            justify="between"
            className={classNames(cls.AdminFooter, {}, [className])}
        >
            <div className={cls.leftSide}>
                {modalOpen && (
                    <Modal isOpen={modalOpen} onClose={onCloseModal}>
                        <div className={cls.modalContent}>
                            <h3 className={cls.modalTitle}>
                                Вы уверены, что хотите удалить объект?
                            </h3>
                            <HStack
                                justify="center"
                                gap="24"
                                className={cls.wrapperButton}
                            >
                                <Button
                                    type="primary"
                                    danger
                                    onClick={handleDeleteItem}
                                >
                                    Удалить
                                </Button>
                                <Button onClick={onCloseModal} type="dashed">
                                    Отмена
                                </Button>
                            </HStack>
                        </div>
                    </Modal>
                )}
                {onDelete && (
                    <Button
                        type="primary"
                        danger
                        onClick={() => setModalOpen(true)}
                        className={cls.button}
                    >
                        Удалить
                    </Button>
                )}
            </div>
            <Flex align="flex-start">
                <Button
                    type="primary"
                    onClick={onUpdate}
                    className={cls.button}
                    style={{ borderColor: 'green' }}
                >
                    Сохранить
                </Button>
                <Button
                    danger
                    onClick={onCancelEdit}
                    className={cls.button}
                    style={{ borderColor: 'red', marginLeft: 20 }}
                >
                    Отменить
                </Button>
            </Flex>
        </HStack>
    );
});
