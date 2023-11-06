import {ListBoxItem} from "@/shared/ui/ListBox/ListBox.tsx";
import {SortOrder} from "@/entities/Product";

export const itemsLimit: ListBoxItem<string>[] = [
    {
        value: '10',
        content: 'Показывать 10',
    },
    {
        value: '60',
        content: 'Показывать 60',
    },
    {
        value: '120',
        content: 'Показывать 120',
    },
];
export const itemsSort: ListBoxItem<SortOrder>[] = [
    {
        value: '',
        content: 'По умолчанию',
    },
    {
        value: 'ascPrice',
        content: 'По возрастанию цены',
    },
    {
        value: 'descPrice',
        content: 'По убыванию цены',
    },
];
