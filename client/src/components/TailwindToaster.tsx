import { CheckIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import toast, { resolveValue, Toaster } from 'react-hot-toast';
import { XMarkIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

import type { ToastType } from 'react-hot-toast';

export const TailwindToaster = () => {
    const toastStyles: Record<ToastType, string> = {
        blank: '',
        custom: '',
        error: 'bg-slate-600 dark:bg-slate-700 text-gray-200',
        loading: '',
        success: 'bg-emerald-700 text-gray-200 dark:bg-emerald-800',
    };

    return (
        <Toaster
            toastOptions={{
                blank: {},
                custom: {},
                inputError: {
                    ariaProps: { role: 'alert', 'aria-live': 'polite' },
                    duration: 3500,
                    position: 'top-center',
                },
                loading: {},
                success: {
                    ariaProps: { role: 'alert', 'aria-live': 'polite' },
                    duration: 2000,
                    position: 'top-center',
                },
            }}
        >
            {(t) => (
                <div
                    className={clsx(
                        'flex flex-row items-center space-x-1 rounded-lg px-2 pb-3 pt-1 font-medium shadow-lg',
                        toastStyles[t.type]
                    )}
                >
                    {/* ERROR ICON */}
                    {t.type === 'error' && <InformationCircleIcon className={'mt-3 mr-2 h-10 w-10'} />}

                    {/* SUCCESS ICON */}
                    {t.type === 'success' && <CheckIcon className={'mt-3 mr-2 h-9 w-9'} />}
                    <div className={'flex flex-col'}>
                        <div className={'flex items-baseline justify-between'}>
                            {/* ERROR TITLE */}
                            {t.type === 'error' && <span className={'text-red-500'}>{'ERROR'}</span>}

                            {/* SUCCESS TITLE */}
                            {t.type === 'success' && <span className={'text-green-500'}>{'SUCCESS'}</span>}

                            {/* CLOSE BUTTON */}
                            <button onClick={() => toast.remove(t.id)}>
                                <XMarkIcon className={'h-6 w-6 hover:scale-110 hover:text-gray-300 active:scale-95'} />
                            </button>
                        </div>

                        {/* TOAST MESSAGE */}
                        <span className={'pr-2 '}>{resolveValue(t.message, t)}</span>
                    </div>
                </div>
            )}
        </Toaster>
    );
};
