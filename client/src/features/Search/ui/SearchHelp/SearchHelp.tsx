import { Brand } from '@/entities/Brand';
import cls from './SearchHelp.module.scss';
import { Product } from '@/entities/Product';
import {
    getRouteBrandsDetails,
    getRouteProductDetails,
} from '@/shared/const/route';
import { AppLink } from '@/shared/ui/AppLink';

interface SearchHelpProps {
    brands?: Pick<Brand, 'id' | 'name'>[];
    products?: Pick<Product, 'id' | 'name'>[];
    toggleSearchBar: () => void;
}

export const SearchHelp = (props: SearchHelpProps) => {
    const { brands, products, toggleSearchBar } = props;

    return (
        <div className={cls.leftSide}>
            <div className={cls.searchHelp}>
                <ul>
                    {brands?.map((brand) => (
                        <li key={brand.id} className={cls.searchHelpItem}>
                            <AppLink
                                to={getRouteBrandsDetails(brand.id)}
                                onClick={toggleSearchBar}
                            >
                                <p>Компания</p>
                                <p>{brand.name}</p>
                            </AppLink>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={cls.searchHelp}>
                <ul>
                    {products?.map((product) => (
                        <li key={product.id} className={cls.searchHelpItem}>
                            <AppLink
                                to={getRouteProductDetails(product.id)}
                                onClick={toggleSearchBar}
                            >
                                <p>{product.name}</p>
                            </AppLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
