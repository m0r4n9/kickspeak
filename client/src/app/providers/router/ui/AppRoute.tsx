import { memo, Suspense, useCallback, useEffect, useState } from 'react';
import {
    AppRoutesProps,
    routeConfig,
} from '@/shared/config/routeConfig/routeConfig.tsx';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '@/app/providers/router/ui/RequireAuth.tsx';
import { Navbar } from '@/widgets/Navbar';
import { checkAuth } from '@/entities/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { HStack } from '@/shared/ui/Stack';
import { Loader } from '@/shared/ui/Loader';

const AppRoute = () => {
    const dispatch = useAppDispatch();
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        const check = async () => {
            if (localStorage.getItem('userId')) {
                await dispatch(checkAuth());
            }
            setComplete(true);
        };
        check();
    }, []);

    const renderWithWrapper = useCallback(
        (route: AppRoutesProps) => {
            if (!complete) {
                return (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <HStack max justify="center" align="center">
                                <Loader />
                            </HStack>
                        }
                    />
                );
            }

            const element = <Suspense fallback={''}>{route.element}</Suspense>;
            let content = (
                <>
                    <Navbar />
                    {element}
                </>
            );

            if (route.authOnly && !route.adminPanel) {
                content = (
                    <RequireAuth>
                        <Navbar />
                        {element}
                    </RequireAuth>
                );
            }

            if (route.adminPanel) {
                if (route.authOnly) {
                    content = (
                        <RequireAuth roles={route.role}>{element}</RequireAuth>
                    );
                } else {
                    content = element;
                }
            }

            return (
                <Route key={route.path} path={route.path} element={content} />
            );
        },
        [complete],
    );

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};
export default memo(AppRoute);
