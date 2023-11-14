import { memo } from 'react';
import cls from './FiltersRightSidebar.module.scss';
import { Button } from '@/shared/ui/Button';
import { RightSidebar } from '@/shared/ui/RightSidebar';
import { ReactComponent as FilterIcon } from '@/shared/assets/icons/filter-icon.svg';
import { useCycle } from 'framer-motion';

export const FiltersRightSidebar = memo(() => {
    const [isOpen, cycleOpen] = useCycle(false, true);

    return (
        <>
            <Button
                variant="clear"
                onClick={() => cycleOpen()}
                className={cls.btn}
            >
                <FilterIcon /> Фильтрация
            </Button>

            <RightSidebar isOpen={isOpen} onClose={cycleOpen}>
                Фильтрация
            </RightSidebar>
        </>
    );
});
