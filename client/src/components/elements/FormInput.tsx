import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import { useToggle } from '../../hooks';
import clsx from 'clsx';

import type { RegisterOptions } from 'react-hook-form';

interface FormInputProps {
    label?: string;
    name: string;
    options?: RegisterOptions;
    type?: 'email' | 'number' | 'password' | 'tel' | 'text';
}

type FormInputHandle = Pick<HTMLInputElement, 'focus' | 'scrollIntoView'>;

// TODO: make icons into icon buttons and handle keyboard focus
// TODO: Make error focus show a red border around the input

const FormInput = forwardRef<FormInputHandle, FormInputProps>(
    ({ label, name, options = {}, type = 'text' }, forwardedRef) => {
        const inputRef = useRef<HTMLInputElement | null>(null);

        const [isPasswordVisible, setIsPasswordVisible] = useToggle(false);

        const {
            formState: { errors },
            register,
            resetField,
            watch,
        } = useFormContext();

        const inputValue: string | undefined = watch(name);

        const inputMethods = register(name, options);

        const errorMessage = errors[name]?.message;
        const isInvalid = errorMessage !== undefined;

        const isPasswordInput = type === 'password';
        const isShowingPassword = isPasswordInput && isPasswordVisible && inputValue;
        const isHidingPassword = isPasswordInput && !isPasswordVisible && inputValue;

        useImperativeHandle(
            forwardedRef,
            () => {
                return {
                    focus: (options?: FocusOptions) => {
                        inputRef.current?.focus(options);
                    },
                    scrollIntoView: (arg?: boolean | ScrollIntoViewOptions) => {
                        inputRef.current?.scrollIntoView(arg);
                    },
                };
            },
            [inputRef, forwardedRef]
        );

        const onClear = () => {
            resetField(name);
            inputRef.current?.focus();
        };

        const setRefs = (element: HTMLInputElement) => {
            inputRef.current = element;
            inputMethods.ref(element);
        };

        return (
            <div>
                {/* LABEL */}
                <label
                    className={clsx(
                        'mb-1 block text-sm font-semibold',
                        options?.required &&
                            'after:text-2xl after:text-red-500 after:content-["*"] dark:after:text-red-400'
                    )}
                    htmlFor={name}
                >
                    {label}
                </label>

                {/* INPUT */}
                <div className={'relative'}>
                    <input
                        className={clsx(
                            'block w-full rounded-md border py-1.5 shadow-sm focus:ring-inset',
                            'placeholder:text-gray-400 focus:ring-2 dark:bg-gray-800 sm:text-sm sm:leading-6',
                            options?.disabled && 'cursor-not-allowed',
                            isInvalid ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                        )}
                        id={name}
                        {...inputMethods}
                        ref={setRefs}
                        type={isPasswordVisible ? 'text' : type}
                    />

                    {/* ICON BUTTONS */}
                    <div className={'absolute top-2.5 right-2 flex space-x-2'}>
                        {/* SHOW PASSWORD */}
                        {isShowingPassword && (
                            <EyeIcon
                                className={clsx(
                                    'h-5 w-5 cursor-pointer hover:scale-110 active:scale-95',
                                    'text-stone-800 hover:text-opacity-50 dark:text-stone-200 hover:dark:text-opacity-50'
                                )}
                                onClick={setIsPasswordVisible.toggle}
                            />
                        )}

                        {/* HIDE PASSWORD */}
                        {isHidingPassword && (
                            <EyeSlashIcon
                                className={clsx(
                                    'h-5 w-5 cursor-pointer hover:scale-110 active:scale-95',
                                    'text-stone-800 hover:text-opacity-50 dark:text-stone-200  hover:dark:text-opacity-50'
                                )}
                                onClick={setIsPasswordVisible.toggle}
                            />
                        )}

                        {/* CLEAR INPUT */}
                        {inputValue && (
                            <XMarkIcon
                                className={clsx(
                                    'h-5 w-5 cursor-pointer hover:scale-110 active:scale-95',
                                    'text-stone-800 hover:text-opacity-50 dark:text-stone-200 hover:dark:text-opacity-50'
                                )}
                                onClick={onClear}
                            />
                        )}
                    </div>
                </div>

                {/* ERROR MESSAGE */}
                <ErrorMessage
                    errors={errors}
                    name={name}
                    render={({ message }) => (
                        <p className={'text-sm font-medium text-red-500 dark:text-red-400'}>{message}</p>
                    )}
                />
            </div>
        );
    }
);

FormInput.displayName = 'FormInput';

export { FormInput };
