import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './BrandsNavigateLetters.module.scss';
import { memo } from 'react';
import { Brand } from '@/entities/Brand';

interface BrandsNavigateLettersProps {
    className?: string;
    groupedBrands: Record<string, Brand[]>;
}

export const BrandsNavigateLetters = memo(
    (props: BrandsNavigateLettersProps) => {
        const { className, groupedBrands } = props;
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

        const scrollToBrandLetter = (id: string) => {
            const container = document.getElementById(id);
            container?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        };

        return (
            <div className={cls.BrandsNavigateLettersContainer}>
                <div
                    className={classNames(cls.BrandsNavigateLetters, {}, [
                        className,
                    ])}
                >
                    <ul className={cls.listLetters}>
                        {alphabet.map((letter) => (
                            <li
                                key={letter}
                                onClick={() => scrollToBrandLetter(letter)}
                                className={classNames(
                                    cls.listLetterItem,
                                    {
                                        [cls.disabled]: !Boolean(
                                            groupedBrands[letter],
                                        ),
                                    },
                                    [],
                                )}
                            >
                                {letter}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    },
);
