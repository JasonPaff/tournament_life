import { Label } from '@radix-ui/react-form';
import { forwardRef } from 'react';
import clsx from 'clsx';

import type { ForwardedRef } from 'react';
import type { FCCFR } from '../../types';

interface FormLabelProps {
    required?: boolean;
}

export const FormLabel: FCCFR<FormLabelProps> = forwardRef(
    ({ children, required }, ref: ForwardedRef<HTMLLabelElement>) => {
        return (
            <Label
                className={clsx(
                    'mb-1 block text-sm font-semibold',
                    required && 'after:text-red-500 after:content-["*"] dark:after:text-red-400'
                )}
                ref={ref}
            >
                {children}
            </Label>
        );
    }
);
