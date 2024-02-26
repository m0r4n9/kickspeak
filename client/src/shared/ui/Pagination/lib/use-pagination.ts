import { useMemo } from 'react';

interface UsePaginationProps {
    page: number;
    totalPage: number;
}

const siblingCount = 2;
export const DOTS = '...';

const range = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

export function usePagination({ page, totalPage }: UsePaginationProps) {
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const paginationRange = useMemo(() => {
        // Pages count is determined as siblingCount + !firstPage + !lastPage + currentPage + 2*DOTS
        const totalPageNumbers = siblingCount + 3;

        if (totalPageNumbers >= totalPage) {
            return range(1, totalPage);
        }

        const leftSiblingIndex = Math.max(page - siblingCount, 1);
        const rightSiblingIndex = Math.min(page + siblingCount, totalPage);

        const shouldShowLeftDots = page > 2;
        const shouldShowRightDots = page < totalPage - 2;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 1 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);
            return leftRange;
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 1 + 2 * siblingCount;
            let rightRange = range(totalPage - rightItemCount + 1, totalPage);
            return rightRange;
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return middleRange;
        }
    }, [page, totalPage, siblingCount]);

    return paginationRange;
}
