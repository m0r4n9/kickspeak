import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ListBox.module.scss';
import { useState } from 'react';
import { Text } from '@/shared/ui/Text';

export interface ListBoxItem<T extends string> {
    value: T;
    content: string;
    disabled?: boolean;
}

interface ListBoxProps<T extends string> {
    className?: string;
    items?: ListBoxItem<T>[];
    value?: T;
    text?: string;
    defaultValue?: string;
    onChange: (value: T) => void;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
    const { className, value, onChange, defaultValue, items } = props;
    const [hover, setHover] = useState(false);
    const activeElement = items?.find((item) => item.value === value);

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={classNames(cls.ListBox, {}, [className])}
        >
            <div className={classNames(cls.input, { [cls.hover]: hover }, [])}>
                {activeElement ? (
                    <Text size="s" text={activeElement.content} />
                ) : (
                    <Text size="s" text={defaultValue} />
                )}
            </div>
            <div
                className={cls.selectDropdown}
                style={
                    hover
                        ? {
                              height: 114,
                              visibility: 'visible',
                          }
                        : {
                              visibility: 'hidden',
                          }
                }
            >
                <ul className={cls.selectList}>
                    {items?.map((item) => (
                        <li
                            key={item.value}
                            onClick={() => onChange(item.value)}
                            className={`${cls.selectItem} ${
                                item.value === value && cls.selected
                            }`}
                        >
                            {item.content}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
