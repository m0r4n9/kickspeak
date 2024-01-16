import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfilePage.module.scss';
import { useSelector } from 'react-redux';
import { memo, useEffect, useState } from 'react';
import { HStack } from '@/shared/ui/Stack';
import { EditProfileCards } from '@/features/EditProfileCards';
import { getUserAuthData } from '@/entities/User';
import { ProfileSidebar } from '../ProfileSidebar/ProfileSidebar.tsx';
import {
    DynamicModuleLoader,
    ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader.tsx';
// TODO: сделать абсолютный импорт
import { profileReducer } from '@/features/EditProfileCards/model/slice/profileSlice.ts';
import { Page } from '@/widgets/Page';
import { useIsMath } from '@/shared/hooks/useIsMath';

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

export const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props;
    const user = useSelector(getUserAuthData);
    const [activeElement, setActiveElement] = useState('name');
    const { isMatch } = useIsMath();

    useEffect(() => {
        if (isMatch) return;
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
                    {!isMatch && <ProfileSidebar activeElement={activeElement} />}
                </HStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ProfilePage);
