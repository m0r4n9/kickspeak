import React, {lazy, memo, Suspense, useCallback, useEffect, useState} from 'react';
import {
    AppRoutesProps,
    routeConfig,
} from '@/shared/config/routeConfig/routeConfig.tsx';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '@/app/providers/router/ui/RequireAuth.tsx';
import { Navbar } from '@/widgets/Navbar';
import { checkAuth } from '@/entities/User';
import { fetchCarts } from '@/entities/Cart';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { HStack } from '@/shared/ui/Stack';
import { Loader } from '@/shared/ui/Loader';

const AppRoute = () => {
    const dispatch = useAppDispatch();
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        const check = async () => {
            if (localStorage.getItem('userId')) {
                await dispatch(checkAuth()).then((response) => {
                    if (response.meta.requestStatus === 'fulfilled') {
                        dispatch(fetchCarts());
                    }
                });
            }
            setComplete(true);
        };
        check();
    }, []);

    const renderWithWrapper = useCallback(
        (route: AppRoutesProps) => {
            const element = <Suspense fallback={''}>{route.element}</Suspense>;
            let content;

            content = (
                <>
                    <Navbar />
                    {element}
                </>
            );

            if (route.authOnly) {
                content = complete ? (
                    <RequireAuth>
                        <Navbar />
                        {element}
                    </RequireAuth>
                ) : (
                    <>
                        <Navbar />
                        <HStack
                            max
                            justify="between"
                            style={{ marginTop: 200 }}
                        >
                            <Loader />
                        </HStack>
                    </>
                );
            }

            if (route.adminPanel) {
                content = complete ? (
                    <RequireAuth roles={route.role}>{element}</RequireAuth>
                ) : (
                    <HStack max justify="center" style={{ marginTop: 200 }}>
                        <Loader />
                    </HStack>
                );
            }

            return (
                <Route key={route.path} path={route.path} element={content} />
            );
        },
        [complete],
    );

    return (<Routes>
        {Object.values(routeConfig).map(renderWithWrapper)}
    </Routes>);
};
export default memo(AppRoute);
