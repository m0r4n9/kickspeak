import cls from '../ProfileCard.module.scss';
import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import { ValidateProfileError } from '@/features/EditProfileCards/model/consts/consts.ts';

interface NameCardProps {
    name?: string;
    surname?: string;
    isLoading?: boolean;
    error?: ValidateProfileError[];
    readonly?: boolean;
    onChangeName?: (value: string) => void;
    onChangeSurname?: (value: string) => void;
}

export const ProfileNameCard = memo((props: NameCardProps) => {
    const {
        name,
        surname,
        error,
        isLoading,
        readonly,
        onChangeName,
        onChangeSurname,
    } = props;

    return (
        <VStack gap="24" align="center" id="name" className={cls.accountItem}>
            <div className={cls.avatar}>
                <div className={cls.avatarData}>
                    {name ? name.charAt(0) + surname?.charAt(0) : 'P'}
                </div>
            </div>

            <HStack max justify="between" className={cls.container}>
                <Input
                    type="text"
                    value={name || ''}
                    onChange={onChangeName}
                    label="Имя"
                    max={20}
                    variant="border"
                    labelFlex="labelColumn"
                    readonly={readonly}
                    disabled={isLoading}
                    className={cls.Input}
                    style={error ? { border: '1px solid red' } : {}}
                />
                <Input
                    type="text"
                    value={surname || ''}
                    onChange={onChangeSurname}
                    label="Фамилия"
                    variant="border"
                    max={20}
                    labelFlex="labelColumn"
                    readonly={readonly}
                    disabled={isLoading}
                    className={cls.Input}
                />
            </HStack>
            <div className={cls.accountDesc}>
                Проверьте правильность ввода личных данных, они необходимы для
                получения и оформления заказа
            </div>
        </VStack>
    );
});
