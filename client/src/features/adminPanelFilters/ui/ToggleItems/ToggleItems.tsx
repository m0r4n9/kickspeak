import cls from './ToggleItems.module.scss';
import { Table } from '@tanstack/react-table';
import { Input } from '@/shared/ui/Input';
import {useState} from "react";

interface ToggleItemsProps<T> {
    table: Table<T>;
    query?: string;
    searchItems?: (query: string) => void;
}

export function ToggleItems<T>(props: ToggleItemsProps<T>) {
    const { table, query, searchItems } = props;


    return (
        <div className={cls.ToggleItems}>
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

            <div className={cls.searchItems}>
                <Input
                    value={query}
                    onChange={searchItems}
                    label="Поиск"
                    labelFlex="labelColumn"
                />
            </div>
        </div>
    );
}
