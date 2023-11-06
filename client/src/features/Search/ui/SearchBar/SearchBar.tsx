import { memo, useEffect, useState } from 'react';
import cls from './SearchBar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useDropdown } from '../../../../shared/hooks/useDropdown';
import { HStack } from '@/shared/ui/Stack';
import { ProductItem } from '@/entities/Product';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { searchProducts } from '../../model/services/searchProducts.ts';
import { useSelector } from 'react-redux';
import { getSearchResult } from '../../model/selectors/searchSelectors.ts';
import { getRouteProductDetails } from '@/shared/const/route.ts';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '@/shared/assets/icons/search-icon-m.svg';
import { ReactComponent as CrossIcon } from '@/shared/assets/icons/cross-icon.svg';

interface SearchBarProps {
    className?: string;
    iconStyle?: string;
}

export const SearchBar = memo((props: SearchBarProps) => {
    const { className, iconStyle } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const products = useSelector(getSearchResult);
    const [state, setState] = useState('');
    const { isOpen, isClosing, refItem, onToggle } = useDropdown({
        animationDelay: 200,
    });

    const onHandlerInput = (value: string) => {
        setState(value);
    };

    useEffect(() => {
        dispatch(searchProducts(state));
    }, [state]);

    return (
        <div className={classNames(cls.SearchBar, {}, [])} ref={refItem}>
            <Button variant="clear" onClick={onToggle} className={className}>
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
                        <form id="search" className={cls.headerSearch}>
                            <div className={cls.filterSearch}>
                                <Input
                                    value={state}
                                    onChange={onHandlerInput}
                                    placeholder="Искать в каталоге"
                                    variant="search"
                                    autoFocus
                                    fullWidth
                                    className={cls.searchInput}
                                />
                                <SearchIcon className={cls.searchIcon} />
                            </div>
                        </form>

                        <HStack max align="start" gap="24">
                            {/* варианты поиска */}
                            <div className={cls.leftSide}>
                                <div className={cls.searchHelp}>
                                    <ul className={cls.searchHelpList}>
                                        {products?.brands.map((brand) => (
                                            <li
                                                key={brand.id}
                                                className={cls.searchHelpItem}
                                            >
                                                <div>
                                                    <p>Компания</p>
                                                    <p>{brand.name}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={cls.searchHelp}>
                                    <ul>
                                        {products?.products.map((product) => (
                                            <li
                                                key={product.id}
                                                onClick={() => {
                                                    onToggle();
                                                    navigate(
                                                        getRouteProductDetails(
                                                            product.id.toString(),
                                                        ),
                                                    );
                                                }}
                                                className={cls.searchHelpItem}
                                            >
                                                <div>
                                                    <p>{product.name}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

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
                                </div>
                            </HStack>
                        </HStack>
                    </div>
                </div>
            )}
        </div>
    );
});
