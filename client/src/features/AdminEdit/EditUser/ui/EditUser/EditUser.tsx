import { memo, useCallback, useEffect, useState } from 'react';
import { DynamicModuleLoader } from '@/shared/lib/components';
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader.tsx';
import { useSelector } from 'react-redux';
import {
    adminUserDetailsActions,
    adminUserDetailsReducer,
} from '../../model/slice/AdminUserDetailsSlice.ts';
import { getAdminUserDetailsErrors } from '../../model/selectors/getAdminUserDetailsErrors/getAdminUserDetailsErrors.ts';
import { getAdminUserDetailsForm } from '../../model/selectors/getAdminuserDetailsForm/getAdminuserDetailsForm.ts';
import { fetchUserById } from '../../model/services/fetchUserById.ts';
import { UserRole } from '@/entities/User';
import { updateUser } from '../../model/services/updateUser.ts';
import { deleteUser } from '../../model/services/deleteUser.ts';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { EditUserCard } from '../EditUserCard/EditUserCard.tsx';
import { getAdminUserDetailsData } from '../../model/selectors/getAdminUserDetailsData/getAdminUserDetailsData.ts';
import { getAdminUserDetailsCart } from '../../model/selectors/getAdminUserDetailsCart/getAdminUserDetailsCart.ts';

interface EditUserProps {
    id?: string;
}

const reducer: ReducerList = {
    adminUserDetails: adminUserDetailsReducer,
};

export const EditUser = memo((props: EditUserProps) => {
    const { id } = props;
    const dispatch = useAppDispatch();
    const userForm = useSelector(getAdminUserDetailsForm);
    const userData = useSelector(getAdminUserDetailsData);
    const cart = useSelector(getAdminUserDetailsCart);
    const errors = useSelector(getAdminUserDetailsErrors);
    const [popOpen, setPopOpen] = useState(false);
    const [validateError, setValidateError] = useState('');

    useEffect(() => {
        if (id) dispatch(fetchUserById({ id }));
    }, []);

    const handleEditPassword = useCallback(
        (value: string) => {
            dispatch(
                adminUserDetailsActions.updateProfile({
                    password: value || '',
                }),
            );
        },
        [dispatch],
    );

    const handleEditName = useCallback(
        (value: string) => {
            dispatch(
                adminUserDetailsActions.updateProfile({ name: value || '' }),
            );
        },
        [dispatch],
    );

    const handleEditSurname = useCallback((value: string) => {
        dispatch(
            adminUserDetailsActions.updateProfile({ surname: value || '' }),
        );
    }, []);

    const handleChangeRoles = useCallback(
        (checked: boolean, role: UserRole) => {
            if (checked) {
                dispatch(adminUserDetailsActions.setRole(role));
                return;
            }
            dispatch(adminUserDetailsActions.removeRole(role));
        },
        [dispatch],
    );

    const handleEditEmail = useCallback((value: string) => {
        dispatch(adminUserDetailsActions.updateProfile({ email: value || '' }));
    }, []);

    const handleEditPhone = useCallback((value: string) => {
        dispatch(
            adminUserDetailsActions.updateProfile({ phoneNumber: value || '' }),
        );
    }, []);

    const handleUpdateUser = useCallback(() => {
        if (userForm === userData) {
            setValidateError('Вы ничего не изменили');
            setPopOpen(true);
            return;
        }
        setValidateError('');
        dispatch(updateUser()).then(() => {
            setPopOpen(true);
        });
    }, [userForm, userData]);

    const handleCancelChanged = useCallback(() => {
        setValidateError('');
        setPopOpen(false);
        dispatch(adminUserDetailsActions.cancelEdit());
    }, [dispatch]);

    const handleDeleteUser = useCallback(() => {
        if (userForm?.id?.toString() === id) {
            setValidateError('Вы не можете удалить самого себя');
            setPopOpen(true);
        } else {
            dispatch(deleteUser());
        }
    }, [userForm?.id]);

    return (
        <DynamicModuleLoader reducers={reducer}>
            <EditUserCard
                userForm={userForm}
                cart={cart}
                errors={errors}
                validateErrors={validateError}
                popOpen={popOpen}
                editPassword={handleEditPassword}
                editName={handleEditName}
                editEmail={handleEditEmail}
                editPhone={handleEditPhone}
                editSurname={handleEditSurname}
                changeRole={handleChangeRoles}
                onUpdateUser={handleUpdateUser}
                onCancelEdit={handleCancelChanged}
                onDeleteUser={handleDeleteUser}
            />
        </DynamicModuleLoader>
    );
});
