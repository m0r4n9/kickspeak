import cls from './ProductsAdditional.module.scss';
import {memo} from 'react';
import {Text} from "@/shared/ui/Text";
import {HStack, VStack} from "@/shared/ui/Stack";
import {AppLink} from "@/shared/ui/AppLink";
import {getRouteProductDetails} from "@/shared/const/route.ts";
import {AppImage} from "@/shared/ui/AppImage";
import {AdditionalProduct} from "../../../../model/types/product.ts";

interface ProductsAdditionalProps {
    className?: string;
    additionalProducts?:  AdditionalProduct[];
    idMainProduct?: number;
}

export const ProductsAdditional = memo((props: ProductsAdditionalProps) => {
    const {className, additionalProducts, idMainProduct} = props;

    return (
        <VStack max gap="8" align="center">
            <Text text="Текущая расцветка" align="center" />
            <HStack max gap="8" justify="center">
                {additionalProducts?.map((color) => (
                    <AppLink
                        key={color.id}
                        to={getRouteProductDetails(color.id.toString())}
                    >
                        <AppImage
                            src={color.Images[0].url}
                            className={`${cls.productsColors} ${
                                color.id === idMainProduct &&
                                cls.activeColor
                            }`}
                        />
                    </AppLink>
                ))}
            </HStack>
        </VStack>
    );
});
