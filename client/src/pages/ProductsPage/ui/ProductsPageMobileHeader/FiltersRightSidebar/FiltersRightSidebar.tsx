import { memo } from 'react';
import cls from './FiltersRightSidebar.module.scss';
import { Button } from '@/shared/ui/Button';
import { Sidebar } from '@/shared/ui/Sidebar';
import { ReactComponent as FilterIcon } from '@/shared/assets/icons/filter-icon.svg';
import { useCycle } from 'framer-motion';
import { VStack } from '@/shared/ui/Stack';
import { ProductFilterPrice } from '@/features/ProductFilterBy';

export const FiltersRightSidebar = memo(() => {
    const [mainSidebar, toggleMainSidebar] = useCycle(false, true);
    const [additionalSidebar, toggleAdditionalSidebar] = useCycle(false, true);

    return (
        <>
            <Button
                variant="ghost"
                onClick={() => toggleMainSidebar()}
                className={cls.btn}
            >
                <FilterIcon /> Фильтрация
            </Button>

            <Sidebar isOpen={mainSidebar} onClose={toggleMainSidebar}>
                Фильтрация
                <VStack>
                    <Button onClick={() => toggleAdditionalSidebar()}>
                        Цена
                    </Button>
                </VStack>
                <Sidebar
                    isOpen={additionalSidebar}
                    onClose={toggleAdditionalSidebar}
                    overlay={false}
                >
                    <ProductFilterPrice />
                </Sidebar>
            </Sidebar>
        </>
    );
});
