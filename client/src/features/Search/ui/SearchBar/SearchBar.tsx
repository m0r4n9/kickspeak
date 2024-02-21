import { memo } from 'react';
import cls from './SearchBar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { Button } from '@/shared/ui/Button';
import { useDropdown } from '../../../../shared/hooks/useDropdown';
import { HStack } from '@/shared/ui/Stack';
import { ProductItem } from '@/entities/Product';
import { useSelector } from 'react-redux';
import { getSearchResult } from '../../model/selectors/searchSelectors.ts';
import { ReactComponent as SearchIcon } from '@/shared/assets/icons/search-icon-m.svg';
import { ReactComponent as CrossIcon } from '@/shared/assets/icons/cross-icon.svg';
import { SearchHelp } from '../SearchHelp/SearchHelp.tsx';
import { SearchForm } from '../SearchForm/SearchForm.tsx';

interface SearchBarProps {
    className?: string;
    iconStyle?: string;
}

export const SearchBar = memo((props: SearchBarProps) => {
    const { className, iconStyle } = props;
    const products = useSelector(getSearchResult);
    const { isOpen, isClosing, refItem, onToggle } = useDropdown({
        animationDelay: 200,
    });

    return (
        <div className={classNames(cls.SearchBar, {}, [])} ref={refItem}>
            <Button variant="ghost" onClick={onToggle} className={className}>
                {isOpen ? (
                    <CrossIcon className={iconStyle} />
                ) : (
                    <SearchIcon className={iconStyle} />
                )}
            </Button>

            {isOpen && (
                <div
                    className={classNames(cls.searchPopup, {
                        [cls.closing]: isClosing,
                    })}
                >
                    <div className={cls.container}>
                        <SearchForm />

                        <HStack
                            max
                            align="start"
                            gap="24"
                            className={cls.content}
                        >
                            <SearchHelp
                                brands={products?.brands}
                                products={products?.products}
                                toggleSearchBar={onToggle}
                            />

                            {/* иконки продукта*/}
                            <HStack max className={cls.rightSide}>
                                <div className={cls.productCatalog}>
                                    {products?.products.map((product) => (
                                        <div
                                            key={product.id}
                                            onClick={onToggle}
                                            className={cls.catalogItem}
                                        >
                                            <ProductItem
                                                product={product}
                                                className={
                                                    cls.productCatalogItem
                                                }
                                            />
                                        </div>
                                    ))}
                                    {products?.products.map((product) => (
                                        <div
                                            key={product.id}
                                            onClick={onToggle}
                                            className={cls.catalogItem}
                                        >
                                            <ProductItem
                                                product={product}
                                                className={
                                                    cls.productCatalogItem
                                                }
                                            />
                                        </div>
                                    ))}
                                    {products?.products.map((product) => (
                                        <div
                                            key={product.id}
                                            onClick={onToggle}
                                            className={cls.catalogItem}
                                        >
                                            <ProductItem
                                                product={product}
                                                className={
                                                    cls.productCatalogItem
                                                }
                                            />
                                        </div>
                                    ))}
                                    {products?.products.map((product) => (
                                        <div
                                            key={product.id}
                                            onClick={onToggle}
                                            className={cls.catalogItem}
                                        >
                                            <ProductItem
                                                product={product}
                                                className={
                                                    cls.productCatalogItem
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </HStack>
                        </HStack>
                    </div>
                </div>
            )}
        </div>
    );
});
