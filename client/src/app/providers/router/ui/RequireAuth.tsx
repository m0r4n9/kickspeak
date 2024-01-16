import { ReactNode, useMemo } from 'react';
import { getUserAuthData, getUserRole, UserRole } from '@/entities/User';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getRouteAdminAuth, getRouteMain } from '@/shared/const/route.ts';

interface RequireAuthProps {
    children: ReactNode;
    roles?: UserRole[];
    loading?: boolean;
}

export function RequireAuth({ children, roles, loading }: RequireAuthProps) {
    const location = useLocation();
    const auth = useSelector(getUserAuthData);
    const userRoles = useSelector(getUserRole);

    const hasRequireRoles = useMemo(() => {
        if (!roles) {
            return true;
        }

        return roles.some((requireRole) => {
            return userRoles?.includes(requireRole);
        });
    }, [roles, userRoles]);

    if (!hasRequireRoles) {
        return (
            <Navigate
                to={getRouteAdminAuth()}
                state={{ from: location }}
                replace
            />
        );
    }

    if (!auth) {
        return (
            <Navigate to={getRouteMain()} state={{ from: location }} replace />
        );
    }

    return children;
}
