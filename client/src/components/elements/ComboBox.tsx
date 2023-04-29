import type { ChangeEvent, MouseEvent, ReactNode } from 'react';

import { CheckIcon, ChevronUpDownIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Combobox } from '@headlessui/react';
import { useState } from 'react';
import clsx from 'clsx';

interface CommonProps<T> {
    displayValue: (item: T) => string;
    filter: (query: string) => Array<T>;
    items: Array<T>;
    label: string;
    notFoundContent?: ReactNode | ((query: string) => ReactNode);
    optionKey: (item: T) => string | number;
}

interface BusyProps {
    busyContent?: ReactNode | (() => ReactNode);
    isBusy: boolean;
}

interface CreateProps {
    allowCreate: boolean;
    createContent: ReactNode | ((query: string) => ReactNode);
}

interface DeleteProps<T> {
    allowDelete: boolean;
    onDelete: (item: T) => Promise<void>;
}

type ComboBoxProps<T> = CommonProps<T> & DynamicProps<BusyProps, CreateProps, DeleteProps<T>>;

export const ComboBox = <T extends object>(props: ComboBoxProps<T>) => {
    const {
        allowCreate,
        allowDelete,
        busyContent,
        createContent,
        displayValue,
        filter,
        isBusy,
        items,
        label,
        notFoundContent,
        onDelete,
        optionKey,
    } = props;

    const [selected, setSelected] = useState<T | null>(null);
    const [query, setQuery] = useState('');

    const filteredItems = query === '' ? items : filter(query);

    const isNotFoundContentAFunction = typeof notFoundContent === 'function';
    const isBusyContentAFunction = typeof busyContent === 'function';
    const isCreateContentAFunction = typeof createContent === 'function';

    const onDeleteInternal = (event: MouseEvent, item: T) => {
        event.stopPropagation();
        setSelected(null);
        setQuery('');
        onDelete?.(item);
    };

    return (
        <div className={'w-72'}>
            <Combobox as={'div'} nullable onChange={setSelected} value={selected}>
                <Combobox.Label className={'block text-sm font-medium leading-6'}>{label}</Combobox.Label>
                <div className={'relative mt-2'}>
                    <Combobox.Input
                        className={clsx(
                            'w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 shadow-sm ring-1 dark:bg-slate-800',
                            'ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:ring-gray-800 sm:text-sm sm:leading-6'
                        )}
                        displayValue={(item: T | null) => (!item ? '' : displayValue(item))}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
                    />

                    <Combobox.Button
                        className={'absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'}
                    >
                        <ChevronUpDownIcon aria-hidden={'true'} className={'h-5 w-5 text-gray-400'} />
                    </Combobox.Button>

                    <Combobox.Options
                        className={clsx(
                            'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 dark:bg-slate-800',
                            'text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                        )}
                    >
                        <>
                            {/* Busy */}
                            {isBusy && (
                                <div className={'cursor-default select-none px-4'}>
                                    <>
                                        {((isBusyContentAFunction && busyContent()) || busyContent) ?? (
                                            <div className={'mb-1 text-base'}>Loading...</div>
                                        )}
                                    </>
                                </div>
                            )}

                            {/* No Results */}
                            {!isBusy && filteredItems.length === 0 && query !== '' && (
                                <>
                                    {((isNotFoundContentAFunction && notFoundContent(query)) || notFoundContent) ?? (
                                        <div className={'cursor-default select-none px-4'}>
                                            <div className={'mb-1 text-base'}>Nothing found.</div>
                                        </div>
                                    )}
                                    {allowCreate &&
                                        ((isCreateContentAFunction && createContent(query)) || createContent)}
                                </>
                            )}

                            {/* Results */}
                            {!isBusy &&
                                filteredItems.map((item) => (
                                    <Combobox.Option
                                        key={optionKey(item)}
                                        value={item}
                                        className={({ active }) =>
                                            clsx(
                                                'relative cursor-default select-none py-2 pl-3 pr-9',
                                                active
                                                    ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                                                    : 'text-gray-900 dark:text-gray-100'
                                            )
                                        }
                                    >
                                        {({ active, selected }) => (
                                            <>
                                                <div className={'flex items-center'}>
                                                    {/* Delete Button */}
                                                    {allowDelete && (
                                                        <button onClick={(event) => onDeleteInternal(event, item)}>
                                                            <TrashIcon
                                                                aria-hidden={'true'}
                                                                className={clsx(
                                                                    'h-3.5 w-3.5',
                                                                    active
                                                                        ? 'text-red-300 dark:text-red-400'
                                                                        : 'text-red-500 dark:text-red-300'
                                                                )}
                                                            />
                                                        </button>
                                                    )}

                                                    {/* Display Value */}
                                                    <span
                                                        className={clsx(
                                                            'truncate',
                                                            selected && 'font-semibold',
                                                            allowDelete && 'ml-3'
                                                        )}
                                                    >
                                                        {displayValue(item)}
                                                    </span>
                                                </div>

                                                {/* Selected Icon */}
                                                {selected && (
                                                    <span
                                                        className={clsx(
                                                            'absolute inset-y-0 right-0 flex items-center pr-4',
                                                            active
                                                                ? 'text-white'
                                                                : 'text-indigo-600 dark:text-indigo-400'
                                                        )}
                                                    >
                                                        <CheckIcon aria-hidden={'true'} className={'h-5 w-5'} />
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))}
                        </>
                    </Combobox.Options>
                </div>
            </Combobox>
        </div>
    );
};
