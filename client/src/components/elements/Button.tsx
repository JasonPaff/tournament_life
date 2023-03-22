import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useButton } from 'react-aria';
import clsx from 'clsx';

import type { AriaButtonProps } from 'react-aria';
import type { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {
    isBusy?: boolean;
    options?: AriaButtonProps<'button'>;
    size?: 'sm' | 'md';
    variant?: 'icon' | 'primary' | 'secondary';
}

type ButtonHandle = Pick<HTMLButtonElement, 'focus' | 'scrollIntoView'>;

const Button = forwardRef<ButtonHandle, ButtonProps>(
    ({ children, isBusy, options = {}, size = 'md', variant = 'primary' }, forwardedRef) => {
        const buttonRef = useRef<HTMLButtonElement | null>(null);

        const { buttonProps } = useButton(options, buttonRef);

        const { isDisabled } = options;

        useImperativeHandle(
            forwardedRef,
            () => {
                return {
                    focus: (options?: FocusOptions) => {
                        buttonRef.current?.focus(options);
                    },
                    scrollIntoView: (arg?: boolean | ScrollIntoViewOptions) => {
                        buttonRef.current?.scrollIntoView(arg);
                    },
                };
            },
            [buttonRef, forwardedRef]
        );

        const variants: Record<string, string> = {
            icon: '',
            primary: clsx('bg-indigo-500 text-white shadow-sm', isDisabled ? 'bg-opacity-50' : 'hover-bg-indigo-400'),
        };

        const sizes: Record<string, string> = {
            sm: 'py-1.5 px-2.5 text-xs',
            md: 'py-2.5 px-3.5 text-sm',
        };

        return (
            <button
                {...buttonProps}
                className={clsx(
                    'inline-flex w-full justify-center rounded-md font-semibold',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
                    isBusy && 'cursor-wait',
                    isDisabled && 'cursor-not-allowed',
                    variants[variant],
                    variant !== 'icon' && sizes[size]
                )}
            >
                {children}

                {/* LOADING SPINNER */}
                {isBusy && (
                    <div
                        className={clsx(
                            'ml-1 mt-0.5 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent',
                            'text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]'
                        )}
                        role={'status'}
                    >
                        <span className={'sr-only'}>Loading...</span>
                    </div>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
