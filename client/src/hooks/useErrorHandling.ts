import { AppRouter } from '../../../server/routers';
import { TRPCClientError } from '@trpc/client';
import toast from 'react-hot-toast';

export const useErrorHandling = () => {
    const isTRPCClientError = (error: unknown): error is TRPCClientError<AppRouter> => error instanceof TRPCClientError;

    const handleError = (error: unknown) => {
        if (isTRPCClientError(error)) toast.error(error.message);
        else console.log(error);
    };

    return { handleError };
};
