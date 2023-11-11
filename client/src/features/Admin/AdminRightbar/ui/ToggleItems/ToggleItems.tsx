import cls from './ToggleItems.module.scss';
import { Table } from '@tanstack/react-table';
import { classNames } from '@/shared/lib/classNames/classNames.ts';

interface ToggleItemsProps<T> {
    className?: string;
    table: Table<T>;
}

export function ToggleItems<T>(props: ToggleItemsProps<T>) {
    const { className, table } = props;

    return (
        <div className={classNames(cls.ToggleItems, {}, [className])}>
            <div className={cls.title}>Toggle Fields</div>
            {table.getAllLeafColumns().map((column) => {
                if (column.id === 'id') return;

                return (
                    <div key={column.id} className="px-1">
                        <label>
                            <input
                                {...{
                                    type: 'checkbox',
                                    checked: column.getIsVisible(),
                                    onChange:
                                        column.getToggleVisibilityHandler(),
                                }}
                            />{' '}
                            {column.columnDef.header as string}
                        </label>
                    </div>
                );
            })}
        </div>
    );
}
