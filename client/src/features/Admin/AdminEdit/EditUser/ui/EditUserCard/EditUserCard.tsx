import { memo } from 'react';
import cls from './EditUserCard.module.scss';
import { Popup } from '@/shared/ui/Popup';
import { HStack, VStack } from '@/shared/ui/Stack';
import { PersonalInfoCard } from '@/features/Admin/AdminEdit/EditUser/ui/PersonalInfoCard/PersonalInfoCard.tsx';
import { RolesUserInfo } from '@/features/Admin/AdminEdit/EditUser/ui/RolesUserInfo/RolesUserInfo.tsx';
import { AdminFooter } from '@/features/Admin/adminFooter';
import { Profile } from '@/entities/Profile';
import { UserRole } from '@/entities/User';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import { CartsDetails } from '../CartsDetails/CartsDetails.tsx';
import { AdminCart } from '@/features/Admin/AdminEdit/EditUser/model/types/adminUserDetailsSchema.ts';

interface EditUserCardProps {
    userForm?: Profile;
    cart?: AdminCart[];
    errors?: ErrorInterface;
    validateErrors?: string;
    popOpen: boolean;
    editPassword?: (value: string) => void;
    editName?: (value: string) => void;
    editSurname?: (value: string) => void;
    editEmail?: (value: string) => void;
    editPhone?: (value: string) => void;
    changeRole?: (checked: boolean, variable: UserRole) => void;
    onCancelEdit?: () => void;
    onUpdateUser?: () => void;
    onDeleteUser?: () => void;
}

export const EditUserCard = memo((props: EditUserCardProps) => {
    const {
        userForm,
        cart,
        errors,
        validateErrors,
        popOpen,
        onDeleteUser,
        onUpdateUser,
        onCancelEdit,
        editPassword,
        editName,
        editPhone,
        editSurname,
        editEmail,
        changeRole,
    } = props;

    if (errors) {
        return (
            <VStack
                align="center"
                justify="center"
                max
                className={cls.wrapper}
                gap="24"
            >
                <h1>{errors.message}</h1>
            </VStack>
        );
    }

    return (
        <VStack max className={cls.wrapper} gap="24">
            {popOpen && (
                <Popup
                    bgColor={validateErrors ? 'bgRed' : 'bgGreen'}
                    title={validateErrors ? 'Ошибка' : 'Успешно'}
                    content={
                        validateErrors
                            ? validateErrors
                            : 'Данные пользователя обновлены'
                    }
                />
            )}
            <HStack max justify="between" className={cls.header}>
                <div>
                    <h1>Изменение пользователя</h1>
                    <h2 className={cls.subTitle}>
                        Уникальный индефикатор пользователя: {userForm?.id}
                    </h2>
                </div>
            </HStack>
            <HStack max className={cls.wrapperInput}>
                <label htmlFor="admin-name-password" className={cls.Label}>
                    Пароль:
                </label>
                <input
                    type="password"
                    id="admin-name-password"
                    placeholder={
                        userForm?.password?.slice(0, 5) + '*'.repeat(10) || ''
                    }
                    onChange={(e) => editPassword?.(e.target.value)}
                    className={cls.Input}
                />
            </HStack>

            <PersonalInfoCard
                name={userForm?.name}
                surname={userForm?.surname}
                email={userForm?.email}
                phone={userForm?.phoneNumber}
                editName={editName}
                editSurname={editSurname}
                editEmail={editEmail}
                editPhone={editPhone}
            />
            <RolesUserInfo
                userRoles={userForm?.role}
                changeRole={changeRole}
                titleClass={cls.blockTitle}
            />

            <CartsDetails cart={cart} titleClass={cls.blockTitle}/>

            <AdminFooter
                onUpdate={onUpdateUser}
                onDelete={onDeleteUser}
                onCancelEdit={onCancelEdit}
            />
        </VStack>
    );
});
