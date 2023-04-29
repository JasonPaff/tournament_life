import type { AriaButtonProps } from 'react-aria';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useButton } from 'react-aria';
import clsx from 'clsx';

type ButtonHandle = Pick<HTMLButtonElement, 'focus' | 'scrollIntoView'>;

type Variant = 'icon' | 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline' | 'link';
type Size = 'none' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends AriaButtonProps<'button'> {
    isBusy?: boolean;
    size?: Size;
    variant?: Variant;
}

export const Button = forwardRef<ButtonHandle, ButtonProps>((props, forwardedRef) => {
    const { children, isBusy, size = 'md', variant = 'primary', ...ariaButtonProps } = props;

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const { buttonProps } = useButton(ariaButtonProps, buttonRef);
    const { disabled } = buttonProps;

    useImperativeHandle(
        forwardedRef,
        () => {
            return {
                focus: (options?: FocusOptions) => buttonRef.current?.focus(options),
                scrollIntoView: (arg?: boolean | ScrollIntoViewOptions) => buttonRef.current?.scrollIntoView(arg),
            };
        },
        [buttonRef, forwardedRef]
    );

    const sizes: Record<Size, string> = {
        none: '',
        sm: 'py-1.5 px-2.5 text-xs',
        md: 'py-2.5 px-3.5 text-sm',
        lg: '',
        xl: '',
    };

    const variants: Record<Variant, string> = {
        destructive: '',
        ghost: '',
        icon: '',
        link: '',
        outline: '',
        primary: clsx(
            'bg-indigo-600 dark:bg-indigo-500 text-white shadow-sm',
            disabled
                ? 'bg-opacity-50 text-opacity-75 dark:text-opacity-50'
                : 'hover:dark:bg-indigo-400 hover:dark:bg-indigo-500'
        ),
        secondary: '',
    };

    return (
        <button
            {...buttonProps}
            className={clsx(
                'inline-flex w-full justify-center rounded-md font-semibold active:scale-95',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                'focus-visible:outline-indigo-600 focus-visible:dark:outline-indigo-500',
                isBusy && 'cursor-wait',
                disabled && 'cursor-not-allowed',
                variants[variant],
                sizes[size]
            )}
        >
            {children}

            {/* LOADING SPINNER */}
            {isBusy && (
                <div
                    className={clsx(
                        'ml-1 mt-0.5 inline-block animate-spin rounded-full border-2 border-solid border-current',
                        'h-4 w-4 border-r-transparent text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]'
                    )}
                    role={'status'}
                >
                    <span className={'sr-only'}>Loading...</span>
                </div>
            )}
        </button>
    );
});

Button.displayName = 'Button';
