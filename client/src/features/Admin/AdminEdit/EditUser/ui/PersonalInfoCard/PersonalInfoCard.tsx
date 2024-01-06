import { memo } from 'react';
import cls from '../EditUserCard/EditUserCard.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';

interface PersonalInfoCardProps {
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    editName?: (value: string) => void;
    editSurname?: (value: string) => void;
    editEmail?: (value: string) => void;
    editPhone?: (value: string) => void;
}

export const PersonalInfoCard = memo((props: PersonalInfoCardProps) => {
    const {
        name,
        surname,
        email,
        phone,
        editName,
        editSurname,
        editEmail,
        editPhone,
    } = props;

    return (
        <VStack max>
            <div className={cls.blockTitle}>Персональные данные</div>
            <HStack max className={cls.wrapperInput}>
                <label htmlFor="admin-name-user" className={cls.Label}>
                    Имя:
                </label>
                <input
                    type="text"
                    id="admin-name-user"
                    value={name || ''}
                    onChange={(e) => editName?.(e.target.value)}
                    className={cls.Input}
                />
            </HStack>

            <HStack max className={cls.wrapperInput}>
                <label htmlFor="admin-name-surname" className={cls.Label}>
                    Фамилия:
                </label>
                <input
                    type="text"
                    id="admin-name-surname"
                    value={surname || ''}
                    onChange={(e) => editSurname?.(e.target.value)}
                    className={cls.Input}
                />
            </HStack>

            <HStack max className={cls.wrapperInput}>
                <label htmlFor="admin-name-email" className={cls.Label}>
                    Электронная почта
                </label>
                <input
                    type="text"
                    id="admin-name-email"
                    value={email || ''}
                    onChange={(e) => editEmail?.(e.target.value)}
                    className={cls.Input}
                />
            </HStack>

            <HStack max className={cls.wrapperInput}>
                <label htmlFor="admin-name-phone" className={cls.Label}>
                    Номер телефона:
                </label>
                <input
                    type="text"
                    id="admin-name-phone"
                    value={phone || ''}
                    onChange={(e) => editPhone?.(e.target.value)}
                    className={cls.Input}
                />
            </HStack>
        </VStack>
    );
});
