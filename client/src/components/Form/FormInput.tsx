import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { FormErrorMessage } from './FormErrorMessage';
import { useFormContext } from 'react-hook-form';
import { Control } from '@radix-ui/react-form';
import { useToggle } from '../../hooks';
import { forwardRef } from 'react';
import clsx from 'clsx';

import type { RegisterOptions } from 'react-hook-form';
import type { HTMLInputTypeAttribute } from 'react';

interface FormInputProps {
    errorMessage?: string;
    name: string;
    registerOptions: RegisterOptions;
    type?: HTMLInputTypeAttribute;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ errorMessage, name, registerOptions, type = 'text' }, forwardedRef) => {
        const {
            formState: { errors },
            register,
            resetField,
            watch,
        } = useFormContext();

        const [isPasswordVisible, setIsPasswordVisible] = useToggle(false);

        const inputValue = watch(name);

        const isInvalid = errorMessage !== undefined;

        const isPasswordInput = type === 'password';
        const isShowingPassword = isPasswordInput && isPasswordVisible && inputValue;
        const isHidingPassword = isPasswordInput && !isPasswordVisible && inputValue;

        const onInputReset = () => resetField(name);

        return (
            <Control asChild>
                <>
                    {/* INPUT FIELD */}
                    <div className={'relative'}>
                        {/* INPUT */}
                        <input
                            className={clsx(
                                'block w-full appearance-none rounded-md py-2 px-2 outline-none',
                                'focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300 dark:focus:border-cyan-500 dark:focus:ring-cyan-500',
                                'relative border bg-white dark:bg-gray-800',
                                registerOptions.disabled && 'cursor-not-allowed',
                                isInvalid ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 '
                            )}
                            type={isShowingPassword ? 'text' : type}
                            {...register(name, registerOptions)}
                        />

                        {/* ICON BUTTONS */}
                        <div className={'absolute top-3 right-2 flex space-x-2'}>
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

                            {/* RESET INPUT */}
                            {inputValue && (
                                <XMarkIcon
                                    className={clsx(
                                        'h-5 w-5 cursor-pointer hover:scale-110 active:scale-95',
                                        'text-stone-800 hover:text-opacity-50 dark:text-stone-200 hover:dark:text-opacity-50'
                                    )}
                                    onClick={onInputReset}
                                />
                            )}
                        </div>
                    </div>

                    {/* ERROR MESSAGE */}
                    <FormErrorMessage>{errorMessage}</FormErrorMessage>
                </>
            </Control>
        );
    }
);
