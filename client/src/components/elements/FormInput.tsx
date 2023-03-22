import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import { useToggle } from '../../hooks';
import { Button } from './Button';
import clsx from 'clsx';

import type { RegisterOptions } from 'react-hook-form';
import type { InputHTMLAttributes } from 'react';

type InputOptions = InputHTMLAttributes<HTMLInputElement> & RegisterOptions & RequiredOptions;
type RequiredOptions = Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'name'>>;
type FormInputHandle = Pick<HTMLInputElement, 'focus' | 'scrollIntoView'>;

interface FormInputProps {
    label: string;
    options: InputOptions;
}

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
    const isDisabled = disabled || readOnly;

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
        if (isDisabled) return;
        resetField(name);
        inputRef.current?.focus();
    };

    const onShowHidePassword = () => {
        if (isDisabled) return;
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

    const styles = {
        input: 'block w-full rounded-md border py-1.5 shadow-sm outline-none placeholder:text-gray-400 dark:bg-gray-800 sm:text-sm sm:leading-6',
        inputDisabled: 'cursor-not-allowed text-gray-400 focus:ring-0',
        inputEnabled: 'focus:ring-2 focus:ring-inset focus:ring-indigo-500',
        inputError: 'text-sm font-medium text-red-500 dark:text-red-400',
        inputInvalid: 'border-red-500',
        inputValid: 'border-gray-200 dark:border-gray-600',
        icon: 'h-5 w-5',
        iconDisabled: 'cursor-not-allowed text-stone-400 dark:text-stone-400',
        iconEnabled: 'cursor-pointer hover:scale-110 hover:text-opacity-50 active:scale-95 hover:dark:text-opacity-50',
        label: 'mb-1.5 block text-sm font-semibold',
        labelRequired: 'after:text-2xl after:text-red-500 after:content-["*"] dark:after:text-red-400',
    };

    return (
        <div>
            {/* LABEL */}
            <label className={clsx(styles.label, required && styles.labelRequired)} htmlFor={name}>
                {label}
            </label>

            {/* INPUT */}
            <div className={'relative'}>
                <input
                    className={clsx(
                        styles.input,
                        disabled ? styles.inputDisabled : styles.inputEnabled,
                        isInvalid ? styles.inputInvalid : styles.inputValid
                    )}
                    {...inputOptions}
                />

                <div className={'absolute top-2.5 right-2 flex space-x-2'}>
                    {/* SHOW/HIDE PASSWORD */}
                    {isPasswordInput && inputValue && (
                        <Button
                            options={{ isDisabled: isDisabled, onPress: onShowHidePassword }}
                            ref={passwordRef}
                            size={'none'}
                            variant={'icon'}
                        >
                            {isHidingPassword && (
                                <EyeSlashIcon
                                    className={clsx(styles.icon, isDisabled ? styles.iconDisabled : styles.iconEnabled)}
                                />
                            )}
                            {isShowingPassword && (
                                <EyeIcon
                                    className={clsx(styles.icon, isDisabled ? styles.iconDisabled : styles.iconEnabled)}
                                />
                            )}
                        </Button>
                    )}

                    {/* CLEAR INPUT */}
                    {inputValue && (
                        <Button options={{ isDisabled: isDisabled, onPress: onClear }} size={'none'} variant={'icon'}>
                            <XMarkIcon
                                className={clsx(styles.icon, isDisabled ? styles.iconDisabled : styles.iconEnabled)}
                            />
                        </Button>
                    )}
                </div>
            </div>

            {/* ERROR MESSAGE */}
            <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) => <p className={styles.inputError}>{message}</p>}
            />
        </div>
    );
});

FormInput.displayName = 'FormInput';

export { FormInput };
