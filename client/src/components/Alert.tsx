import { ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import { CheckmarkIcon } from 'react-hot-toast';
import clsx from 'clsx';

import type { FC } from 'react';

type AlertType = 'error' | 'info' | 'success' | 'warning';

interface AlertProps {
    message: string;
    type: AlertType;
}

export const Alert: FC<AlertProps> = ({ message, type }) => {
    const styles: Record<AlertType, string> = {
        error: 'bg-red-100 border-red-400',
        info: 'bg-blue-200 border-blue-400 text-gray-800 dark:bg-slate-700 dark:text-gray-200',
        success: ' g-green-100 border-green-400',
        warning: 'bg-yellow-100 border-yellow-400',
    };

    const icons: Record<AlertType, JSX.Element> = {
        error: <ExclamationCircleIcon className={'h-5 w-5 text-red-700'} />,
        info: <InformationCircleIcon className={'h-6 w-6 text-blue-500 dark:text-blue-300'} />,
        success: <CheckmarkIcon className={'h-5 w-5 text-green-700'} />,
        warning: <ExclamationCircleIcon className={'h-5 w-5 text-yellow-700'} />,
    };

    return (
        <div className={clsx('text-md flex items-center p-2 font-medium', styles[type])}>
            <span className={'mr-2'}>{icons[type]}</span>
            <span>{message}</span>
        </div>
    );
};
