import cls from '../ProfileCard.module.scss';
import { memo } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import {ValidateProfileError} from "@/features/EditProfileCards/model/consts/consts.ts";

interface NameCardProps {
    email?: string;
    isLoading?: boolean;
    error?: ValidateProfileError;
    readonly?: boolean;
    onChangeEmail?: (value: string) => void;
}

export const ProfileEmailCard = memo((props: NameCardProps) => {
    const {email, error, isLoading, readonly, onChangeEmail} = props;

    return (
        <VStack
            gap="24"
            align="start"
            max
            id="email"
            className={cls.accountItem}
        >
            <Text title="Электронная почта" size="s" bold />
            <div className={cls.wrapperEmailInput}>
                <Input
                    value={email || ''}
                    onChange={onChangeEmail}
                    readonly={readonly}
                    label="Почта"
                    type="email"
                    fullWidth
                    variant="border"
                    disabled={isLoading}
                    labelFlex="labelColumn"
                    className={cls.Input}
                    style={error ? {border: '1px solid red'} : {}}
                />
                <div className={cls.accountDesc}>
                    Получайте информацию о состоянии статуса ваших заказов
                </div>
            </div>
        </VStack>
    );
});
