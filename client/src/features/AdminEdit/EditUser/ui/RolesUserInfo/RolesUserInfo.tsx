import { memo } from 'react';
import cls from './RolesUserInfo.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { UserRolesArray } from '@/shared/const/UserRolesArray.ts';
import { UserRole } from '@/entities/User';

interface RolesUserInfoProps {
    titleClass?: string;
    userRoles?: UserRole[];
    changeRole?: (checked: boolean, variable: UserRole) => void;
}

export const RolesUserInfo = memo((props: RolesUserInfoProps) => {
    const { titleClass, userRoles, changeRole } = props;

    return (
        <VStack max>
            <div className={titleClass}>Привелегии</div>
            <HStack max className={cls.wrapperInput}>
                <p>Статус: </p>
                <VStack className={cls.listRoles}>
                    {UserRolesArray.map((role, index) => {
                        const checked = userRoles?.includes(role) || false;

                        return (
                            <label key={index} className={cls.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    value={role}
                                    onChange={(e) => changeRole?.(e.target.checked, role)}
                                    checked={checked}
                                />
                                {role}
                            </label>
                        )
                    })}
                </VStack>
            </HStack>
        </VStack>
    );
});
