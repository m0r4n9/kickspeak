import { memo } from 'react';
import cls from './FiltersRightSidebar.module.scss';
import { Button } from '@/shared/ui/Button';
import { Sidebar } from '@/shared/ui/Sidebar';
import { useCycle } from 'framer-motion';
import {HStack, VStack} from "@/shared/ui/Stack";
import { ReactComponent as FilterIcon } from '@/shared/assets/icons/filter-icon.svg';
import {ReactComponent as CrossIcon } from "@/shared/assets/icons/cross-icon.svg";

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

            <Sidebar isOpen={isOpen} onClose={cycleOpen}>
                <VStack max className={cls.filtersProduct}>
                    <HStack justify="center" max>
                        <div style={{height: '100%'}}>
                            <Button variant="clear">
                                <CrossIcon width={16}/>
                            </Button>
                        </div>
                        <p>Фильтры</p>
                    </HStack>
                </VStack>
            </Sidebar>
        </>
    );
});
