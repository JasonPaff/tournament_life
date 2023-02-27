import clsx from 'clsx';

import type { FCCN } from '../types';

export const CrossIcon: FCCN = ({ className }) => {
    return (
        <svg
            xmlns={'http://www.w3.org/2000/svg'}
            fill={'none'}
            viewBox={'0 0 24 24'}
            strokeWidth={1.5}
            stroke={'currentColor'}
            className={clsx('h-6 w-6', className)}
        >
            <path strokeLinecap={'round'} strokeLinejoin={'round'} d={'M6 18L18 6M6 6l12 12'} />
        </svg>
    );
};