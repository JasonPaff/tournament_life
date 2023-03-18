import type { FCC } from '../../types';

export const FormError: FCC = ({ children }) => {
    return <div className={'text-sm text-red-400 dark:text-red-500'}>{children}</div>;
};