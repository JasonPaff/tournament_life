import { Control, Field, Label } from '@radix-ui/react-form';
import { forwardRef } from 'react';
import clsx from 'clsx';

import type { ForwardedRef } from 'react';
import type { FCFR } from '../../types';

interface InputFieldProps {
    fieldClassName?: string;
    inputClassName?: string;
    label: string;
    labelClassName?: string;
    name: string;
    required?: boolean;
}

export const InputField: FCFR<InputFieldProps> = forwardRef(
    (
        { fieldClassName, inputClassName, label, labelClassName, name, required },
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <Field className={fieldClassName} name={name}>
                <Label
                    className={clsx(
                        'mb-1 block text-sm font-semibold text-gray-900 dark:text-gray-100',
                        required && 'after:text-xl after:text-red-400 after:content-["*"] dark:after:text-red-500',
                        labelClassName
                    )}
                >
                    {label}
                </Label>
                <Control asChild>
                    <input
                        className={clsx(
                            'block w-full appearance-none rounded-md bg-white py-2 px-2 outline-none dark:bg-gray-400',
                            'focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300 dark:focus:border-cyan-500 dark:focus:ring-cyan-500',
                            'border border-gray-200 dark:border-gray-800',
                            inputClassName
                        )}
                        ref={ref}
                        required={required}
                    />
                </Control>
            </Field>
        );
    }
);