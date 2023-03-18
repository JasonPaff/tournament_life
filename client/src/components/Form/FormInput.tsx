import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useFormContext } from 'react-hook-form';
import { Control } from '@radix-ui/react-form';
import { FormError } from './FormError';
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
        const { register } = useFormContext();

        const [isPasswordVisible, setIsPasswordVisible] = useToggle(false);

        const isTypePassword = type === 'password';
        const isShowingPassword = isTypePassword && isPasswordVisible;
        const isHidingPassword = isTypePassword && !isPasswordVisible;

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
                                'relative border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-500',
                                registerOptions.disabled && 'cursor-not-allowed'
                            )}
                            type={isShowingPassword ? 'text' : type}
                            {...register(name, registerOptions)}
                        />

                        {/* SHOW PASSWORD ICON */}
                        {isShowingPassword && (
                            <EyeIcon
                                className={clsx(
                                    'absolute top-3 right-2 h-5 w-5 cursor-pointer',
                                    'text-gray-400 hover:text-opacity-50 dark:text-gray-400 hover:dark:text-opacity-50'
                                )}
                                onClick={setIsPasswordVisible.toggle}
                            />
                        )}

                        {/* HIDE PASSWORD ICON */}
                        {isHidingPassword && (
                            <EyeSlashIcon
                                className={clsx(
                                    'absolute top-3 right-2 h-5 w-5 cursor-pointer',
                                    'text-gray-400 hover:text-opacity-50 dark:text-gray-400 hover:dark:text-opacity-50'
                                )}
                                onClick={setIsPasswordVisible.toggle}
                            />
                        )}
                    </div>

                    {/* ERROR MESSAGE */}
                    <FormError>{errorMessage}</FormError>
                </>
            </Control>
        );
    }
);