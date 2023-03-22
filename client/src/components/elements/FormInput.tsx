import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import { useToggle } from '../../hooks';
import clsx from 'clsx';

import type { RegisterOptions } from 'react-hook-form';
import type { InputHTMLAttributes } from 'react';
import { Button } from './Button';

type RequiredOptions = Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'name'>>;
type OptionsType = InputHTMLAttributes<HTMLInputElement> & RegisterOptions & RequiredOptions;
type FormInputHandle = Pick<HTMLInputElement, 'focus' | 'scrollIntoView'>;

interface FormInputProps {
    label: string;
    options: OptionsType;
}

// TODO: make icons into icon buttons and handle keyboard focus
// TODO: Make error focus show a red border around the input

const FormInput = forwardRef<FormInputHandle, FormInputProps>(({ label, options }, forwardedRef) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLButtonElement | null>(null);

    const [isPasswordVisible, setIsPasswordVisible] = useToggle(false);

    const {
        formState: { errors },
        register,
        resetField,
        watch,
    } = useFormContext();

    const { disabled, name, readOnly, required, type } = options;

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
        if (disabled || readOnly) return;
        resetField(name);
        inputRef.current?.focus();
    };

    const onShowHidePassword = () => {
        if (disabled || readOnly) return;
        setIsPasswordVisible.toggle();
        passwordRef.current?.focus();
    };

    const setRefs = (element: HTMLInputElement) => {
        inputRef.current = element;
        inputMethods.ref(element);
    };

    const inputOptions = {
        ...options,
        ...inputMethods,
        ref: setRefs,
        required: false,
        type: isPasswordVisible ? 'text' : type ?? 'text',
    };

    return (
        <div>
            {/* LABEL */}
            <label
                className={clsx(
                    'mb-1.5 block text-sm font-semibold',
                    required && 'after:text-2xl after:text-red-500 after:content-["*"] dark:after:text-red-400'
                )}
                htmlFor={name}
            >
                {label}
            </label>

            {/* INPUT */}
            <div className={'relative'}>
                <input
                    className={clsx(
                        'block w-full rounded-md border py-1.5 shadow-sm focus:ring-inset focus:ring-indigo-500 ',
                        'placeholder:text-gray-400 focus:ring-2 dark:bg-gray-800 sm:text-sm sm:leading-6',
                        (disabled || readOnly) && 'cursor-not-allowed',
                        isInvalid ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                    )}
                    {...inputOptions}
                />

                <div className={'absolute top-2.5 right-2 flex space-x-2'}>
                    {/* SHOW/HIDE PASSWORD */}
                    {isPasswordInput && (
                        <Button
                            options={{ onPress: onShowHidePassword }}
                            ref={passwordRef}
                            size={'sm'}
                            variant={'icon'}
                        >
                            {isHidingPassword && (
                                <EyeSlashIcon
                                    className={clsx(
                                        'h-5 w-5 cursor-pointer hover:scale-110 active:scale-95',
                                        'text-stone-800 hover:text-opacity-50 dark:text-stone-200 hover:dark:text-opacity-50'
                                    )}
                                />
                            )}
                            {isShowingPassword && (
                                <EyeIcon
                                    className={clsx(
                                        'h-5 w-5 cursor-pointer hover:scale-110 active:scale-95',
                                        'text-stone-800 hover:text-opacity-50 dark:text-stone-200 hover:dark:text-opacity-50'
                                    )}
                                />
                            )}
                        </Button>
                    )}

                    {/* CLEAR INPUT */}
                    {inputValue && (
                        <Button options={{ onPress: onClear }} size={'sm'} variant={'icon'}>
                            <XMarkIcon
                                className={clsx(
                                    'h-5 w-5 cursor-pointer hover:scale-110 active:scale-95',
                                    'text-stone-800 hover:text-opacity-50 dark:text-stone-200 hover:dark:text-opacity-50'
                                )}
                            />
                        </Button>
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
});

FormInput.displayName = 'FormInput';

export { FormInput };
