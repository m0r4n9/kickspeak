import cls from './Table.module.scss';
import { flexRender, Table } from '@tanstack/react-table';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import {Loader} from "@/shared/ui/Loader";

interface TableProps<T> {
    className?: string;
    table: Table<T>;
    navigateDetails?: (id: string) => void;
}

export function TableComponents<T>(props: TableProps<T>) {
    const { className, table, navigateDetails } = props;

    return (
        <table className={classNames(cls.Table, {}, [className])}>
            <thead className={cls.tableHeaders}>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className={cls.tableRows}>
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                colSpan={header.colSpan}
                                className={cls.tableHeaderItem}
                            >
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext(),
                                      )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => {
                    return (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className={`${cls.tableBodyItem} ${
                                        cell.column.columnDef.header === 'id' &&
                                        cls.active
                                    }`}
                                    onClick={() => {
                                        cell.column.columnDef.header === 'id' &&
                                            navigateDetails?.(
                                                row.getValue('id'),
                                            );
                                    }}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
            <tfoot>
                {table.getFooterGroups().map((footerGroup) => (
                    <tr key={footerGroup.id}>
                        {footerGroup.headers.map((header) => (
                            <th key={header.id} colSpan={header.colSpan}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.footer,
                                          header.getContext(),
                                      )}
                            </th>
                        ))}
                    </tr>
                ))}
            </tfoot>
        </table>
    );
}
