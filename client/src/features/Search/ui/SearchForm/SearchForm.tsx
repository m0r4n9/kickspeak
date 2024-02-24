import { useEffect, useState } from 'react';
import cls from './SearchForm.module.scss';
import { searchProducts } from '../../model/services/searchProducts';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { ReactComponent as SearchIcon } from '@/shared/assets/icons/search-icon-m.svg';
import { ReactComponent as CrossIcon } from '@/shared/assets/icons/close-icon.svg';

export const SearchForm = () => {
    const dispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(searchProducts(searchQuery));
    }, [searchQuery]);

    return (
        <form id="search" className={cls.headerSearch}>
            <div className={cls.filterSearch}>
                <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Искать в каталоге"
                    variant="search"
                    autoFocus
                    className={cls.searchInput}
                />
                <SearchIcon className={cls.searchIcon} />
                <div className={cls.wrapperQueryIcon}>
                    {searchQuery && (
                        <Button
                            variant="ghost"
                            onClick={() => setSearchQuery('')}
                            className={cls.clearQueryBtn}
                        >
                            <CrossIcon className={cls.crossIcon} />
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
};
