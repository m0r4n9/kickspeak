import { memo, useCallback, useState } from 'react';
import cls from './FiltersRightSidebar.module.scss';
import { Button } from '@/shared/ui/Button';
import { RightSidebar } from '@/shared/ui/RightSidebar';
import { ReactComponent as FilterIcon } from '@/shared/assets/icons/filter-icon.svg';

interface FiltersRightSidebarProps {
    className?: string;
}

export const FiltersRightSidebar = memo((props: FiltersRightSidebarProps) => {
    const { className } = props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const onClose = useCallback(() => {
        setSidebarOpen(false);
    }, []);

    return (
        <>
            <Button
                variant="clear"
                onClick={() => setSidebarOpen(true)}
                className={cls.btn}
            >
                <FilterIcon /> Фильтрация
            </Button>
            {sidebarOpen && (
                <RightSidebar isOpen={sidebarOpen} onClose={onClose}>
                    Фильтрация
                </RightSidebar>
            )}
        </>
    );
});
