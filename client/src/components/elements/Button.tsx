import { forwardRef } from 'react';
import clsx from 'clsx';

import type { ForwardedRef } from 'react';
import type { FCC } from '../../types';

interface ButtonProps {
    isBusy?: boolean;
    type?: 'submit' | 'reset' | 'button';
}

const Button: FCC<ButtonProps> = forwardRef(
    ({ children, isBusy, type = 'button' }, ref: ForwardedRef<HTMLButtonElement>) => {
        return (
            <button
                className={clsx(
                    'relative mt-8 inline-flex w-full justify-center overflow-hidden rounded-md bg-cyan-500 py-2 px-3 dark:bg-cyan-700',
                    'text-sm font-semibold text-white outline-2 outline-offset-2 transition-colors',
                    'before:absolute before:inset-0 before:transition-colors hover:before:bg-white/10',
                    'active:bg-cyan-600 active:text-white/80 active:before:bg-transparent'
                )}
                disabled={isBusy}
                ref={ref}
                type={type}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
