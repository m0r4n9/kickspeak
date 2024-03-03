import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Checkbox.module.scss';
import { ReactNode } from 'react';

export interface CheckBoxItem {
    value: string;
    content?: ReactNode;
    checked?: boolean;
}

interface CheckboxProps<T> {
    className?: string;
    items: CheckBoxItem[];
    onChange?: (checked: boolean, variable: T) => void;
}

export function Checkbox<T>(props: CheckboxProps<T>) {
    const { className, items, onChange } = props;

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            <ul>
                {items.map((item) => (
                    <li key={item.value}>
                        <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={(e) => {
                                onChange?.(e.target.checked, item.value as T);
                            }}
                            id={`фильтр_${item.content}`}
                            className={cls.checkbox}
                        />
                        <label htmlFor={`фильтр_${item.content}`}>
                            {item.content ? item.content : item.value}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}
