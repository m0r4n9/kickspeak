import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Pagination.module.scss';
import { DOTS, usePagination } from './lib/use-pagination';
import { AppLink } from '../AppLink';
import { Button } from 'antd';

interface PaginationProps {
    className?: string;
    page: number;
    totalPage: number;
    onChangePage: (page: number) => void;
}

export const Pagination = (props: PaginationProps) => {
    const { className, page, totalPage, onChangePage } = props;
    const paginationRange = usePagination({ page, totalPage });

    return (
        <div>
            <ul className={cls.list}>
                {paginationRange?.map((pageNumber, index) => (
                    <li
                        key={index}
                        className={classNames(cls.item, {
                            [cls.selected]: page === pageNumber,
                        })}
                    >
                        <div
                            onClick={() => onChangePage(pageNumber)}
                            className={cls.link}
                        >
                            {pageNumber}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
