import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfilePage.module.scss';
import { memo, useEffect, useState } from 'react';
import { HStack } from '@/shared/ui/Stack';
import { EditProfileCards } from '@/features/EditProfileCards';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { ProfileSidebar } from '@/pages/ProfilePage/ui/ProfileSidebar/ProfileSidebar.tsx';
import {
    DynamicModuleLoader,
    ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader.tsx';
import { profileReducer } from '@/features/EditProfileCards/model/slice/profileSlice.ts';
import {Page} from "@/widgets/Page";

interface ProfilePageProps {
    className?: string;
}

const reducer: ReducerList = {
    profile: profileReducer,
};

const options = {
    root: document.querySelector('#wrapper_data'),
    rootMargin: '0px 0px -50% 0px',
    threshold: 1,
};

// Пофиксить анимацию
export const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props;
    const user = useSelector(getUserAuthData);
    const [activeElement, setActiveElement] = useState('name');

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveElement(entry.target.id);
                }
            });
        }, options);

        document.querySelectorAll('#wrapper_data > div').forEach((div) => {
            observer.observe(div);
        });

        return () => {
            document.querySelectorAll('#wrapper_data > div').forEach((div) => {
                observer.unobserve(div);
            });
        };
    }, [options, activeElement]);

    return (
        <DynamicModuleLoader reducers={reducer}>
            <Page>
                <HStack
                    max
                    justify="center"
                    align="start"
                    className={classNames(cls.ProfilePage, {}, [className])}
                >
                    <EditProfileCards id={user?.id} />
                    <ProfileSidebar activeElement={activeElement} />
                </HStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ProfilePage);
