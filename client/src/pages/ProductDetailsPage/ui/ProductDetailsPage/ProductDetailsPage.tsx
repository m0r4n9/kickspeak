import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProductDetailsPage.module.scss';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Text } from '@/shared/ui/Text';
import { ProductDetails } from '@/entities/Product';
import {Page} from "@/widgets/Page";

interface ProductDetailsPageProps {
    className?: string;
}

export const ProductDetailsPage = (props: ProductDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();

    // if (!id) {
    //     return (
    //         <Page
    //             className={classNames(cls.ProductDetailsPage, {}, [className])}
    //         >
    //             <Text
    //                 title="Данный товар не найден"
    //                 color="error"
    //                 align="center"
    //             />
    //         </Page>
    //     );
    // }

    return (
        <Page className={classNames(cls.ProductDetailsPage, {}, [className])}>
            <ProductDetails id={id}/>
        </Page>
    );
};

export default memo(ProductDetailsPage);
