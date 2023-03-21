import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useButton } from 'react-aria';
import clsx from 'clsx';

import type { AriaButtonProps } from 'react-aria';
import type { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {
    isBusy?: boolean;
    options?: AriaButtonProps;
}

type ButtonHandle = Pick<HTMLButtonElement, 'focus' | 'scrollIntoView'>;

const Button = forwardRef<ButtonHandle, ButtonProps>(({ children, isBusy, options = {} }, forwardedRef) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const { buttonProps } = useButton(options, buttonRef);

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

    return (
        <button
            {...buttonProps}
            className={clsx(
                'inline-flex w-full justify-center rounded-md bg-indigo-500 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
                isBusy && 'cursor-wait',
                options?.isDisabled ? 'cursor-not-allowed' : 'hover:bg-indigo-400'
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
});

Button.displayName = 'Button';

export { Button };
