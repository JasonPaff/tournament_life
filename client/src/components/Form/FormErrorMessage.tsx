import type { FCC } from '../../types';

export const FormErrorMessage: FCC = ({ children }) => {
    return <div className={'text-sm font-medium text-red-500 dark:text-red-400'}>{children}</div>;
};
