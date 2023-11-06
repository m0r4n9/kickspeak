import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileSidebar.module.scss';
import { VStack } from '@/shared/ui/Stack';

const itemsSidebar = [
    {
        content: 'Имя и фамилия',
        id: 'name',
    },
    {
        content: 'Электронная почта',
        id: 'email',
    },
    {
        content: 'Номер телефона',
        id: 'phone',
    },
];

interface ProfileSidebarProps {
    className?: string;
    activeElement: string;
}

export const ProfileSidebar = (props: ProfileSidebarProps) => {
    const { className, activeElement  } = props;

    return (
        <VStack
            align="end"
            className={classNames(cls.ProfileSidebar, {}, [className])}
        >
            <ul className={cls.navigationMenu}>
                {itemsSidebar.map((item) => (
                    <li key={item.content}>
                        <div
                            className={classNames(cls.navigationItem, {
                                [cls.active]: item.id === activeElement,
                            })}
                            onClick={() => {
                                const divElement = document.getElementById(item.id);

                                divElement?.scrollIntoView({ block: 'start', behavior: 'smooth' })
                            }}
                        >
                            {item.content}
                        </div>
                    </li>
                ))}
            </ul>
        </VStack>
    );
};
