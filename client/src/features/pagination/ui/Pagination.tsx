import cls from './Pagination.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { HStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { ReactComponent as ArrowIcon } from '@/shared/assets/icons/arrow-bottom.svg';
import {memo} from "react";

interface PaginationProps {
    className?: string;
    pageNumber?: number;
    hasMore?: boolean;
    nextPage?: () => void;
    prevPage?: () => void;
    startPage?: () => void;
    endPage?: () => void;
}

export const Pagination = (props: PaginationProps) => {
    const {
        className,
        pageNumber,
        hasMore,
        nextPage,
        prevPage,
        startPage,
        endPage,
    } = props;

    return (
        <HStack
            justify="center"
            align="center"
            max
            className={classNames(cls.Pagination, {}, [className])}
        >
            <div className={cls.leftSide}>
                <Button disabled={pageNumber === 1} onClick={startPage}>
                    <ArrowIcon />
                </Button>
                <Button onClick={prevPage} disabled={pageNumber === 1}>
                    <ArrowIcon />
                </Button>
            </div>

            <div className={cls.pageNumber}>{pageNumber}</div>

            <div className={cls.rightSide}>
                <Button onClick={nextPage} disabled={!hasMore}>
                    <ArrowIcon />
                </Button>
                <Button disabled={!hasMore}>
                    <ArrowIcon />
                </Button>
            </div>
        </HStack>
    );
};
