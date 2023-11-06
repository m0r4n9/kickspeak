import {ReactNode, useEffect, useMemo} from 'react';
import {checkAuth, getUserAuthData, getUserIsLoading, getUserRole, UserRole} from '@/entities/User';
import {useSelector} from 'react-redux';
import {Navigate, useLocation} from 'react-router-dom';
import {getRouteAdminAuth, getRouteMain} from '@/shared/const/route.ts';
import {useAppDispatch} from "@/shared/hooks/useAppDispatch";
import {fetchCarts} from "@/entities/Cart";
import {HStack} from "@/shared/ui/Stack";
import {Loader} from "@/shared/ui/Loader";

interface RequireAuthProps {
    children: ReactNode;
    roles?: UserRole[];
    loading?: boolean;
}

export function RequireAuth({children, roles, loading}: RequireAuthProps) {
    const auth = useSelector(getUserAuthData);
    const userRoles = useSelector(getUserRole);

    const location = useLocation();


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
                state={{from: location}}
                replace
            />
        );
    }

    if (!auth) {
        return (
            <Navigate to={getRouteMain()} state={{from: location}} replace/>
        );
    }

    return children;
}
