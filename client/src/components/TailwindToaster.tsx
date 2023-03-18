import toast, { resolveValue, Toaster } from 'react-hot-toast';
import { CrossIcon } from './CrossIcon';
import clsx from 'clsx';

import type { ToastType } from 'react-hot-toast';

export const TailwindToaster = () => {
    const toastStyles: Record<ToastType, string> = {
        blank: '',
        custom: '',
        error: 'bg-red-600 text-gray-200',
        loading: '',
        success: 'bg-emerald-700 text-gray-200 dark:bg-emerald-800',
    };

    return (
        <Toaster
            reverseOrder
            toastOptions={{
                blank: {},
                custom: {},
                error: { duration: 3000, position: 'top-center' },
                loading: {},
                success: { duration: 3000, position: 'top-right' },
            }}
        >
            {(t) => (
                <div
                    className={clsx(
                        'flex flex-row items-center space-x-1 rounded px-2 py-4 shadow-lg',
                        toastStyles[t.type]
                    )}
                >
                    <span className={'font-medium'}>{resolveValue(t.message, t)}</span>
                    <button onClick={() => toast.remove(t.id)}>
                        <CrossIcon className={'hover:scale-110 hover:text-gray-300 active:scale-95'} />
                    </button>
                </div>
            )}
        </Toaster>
    );
};