import cls from '../ProfileCard.module.scss';
import { memo } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import {ValidateProfileError} from "@/features/EditProfileCards/model/consts/consts.ts";

interface NameCardProps {
    phone?: string;
    error?: string;
    isLoading?: boolean,
    readonly?: boolean;
    onChangePhone?: (value: string) => void;
}

export const ProfilePhoneCard = memo((props: NameCardProps) => {
    const {phone, isLoading, error, readonly, onChangePhone} = props;

    return (
        <VStack
            gap="24"
            align="start"
            max
            id="phone"
            className={cls.accountItem}
        >
            <Text title="Номер телефона" size="s" bold />
            <div className={cls.wrapperEmailInput}>
                <Input
                    fullWidth
                    type="tel"
                    pattern="[7-9]{1}[0-9]{9}"
                    label="Номер телефона"
                    variant="border"
                    labelFlex="labelColumn"
                    value={phone || ''}
                    onChange={onChangePhone}
                    readonly={readonly}
                    disabled={isLoading}
                    className={cls.Input}
                    style={error ? {border: '1px solid red'} : {}}
                />
                <div className={cls.accountDesc}>
                    Номер телефона необходим для оформления заказа
                </div>
            </div>
        </VStack>
    );
});
