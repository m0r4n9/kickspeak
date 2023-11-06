import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainPage.module.scss';
import { memo } from 'react';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteCatalog } from '@/shared/const/route.ts';
import { HStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import { AppImage } from '@/shared/ui/AppImage';
import menImage from '@/shared/assets/images/men_home_20230903_677x724.jpg';
import womenImage from '@/shared/assets/images/women_home_20230903_677x724.jpg';

interface MainPageProps {
    className?: string;
}

const MainPage = (props: MainPageProps) => {
    const { className } = props;

    useDocumentTitle('Главная страница');

    return (
        <Page className={classNames(cls.MainPage, {}, [className])}>
            <HStack max justify="center" gap="24">
                <div className={cls.card}>
                    <AppLink to={`${getRouteCatalog()}?sex=M`}>
                        <div>
                            <AppImage className={cls.image} src={menImage} />
                        </div>
                        <div className={cls.wrapperTitle}>
                            <h3 className={cls.title}>Мужское</h3>
                        </div>
                    </AppLink>
                </div>

                <div className={cls.card}>
                    <AppLink to={`${getRouteCatalog()}?sex=W`}>
                        <div>
                            <AppImage className={cls.image} src={womenImage} />
                        </div>
                        <div className={cls.wrapperTitle}>
                            <h3 className={cls.title}>Женское</h3>
                        </div>
                    </AppLink>
                </div>
            </HStack>
        </Page>
    );
};

export default memo(MainPage);
