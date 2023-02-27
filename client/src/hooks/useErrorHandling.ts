import { TRPCClientError } from '@trpc/client';
import {AppRouter} from "../../../server/routers";
import toast from 'react-hot-toast';

export const useErrorHandling = () => {
    const isTRPCClientError = (error: unknown): error is TRPCClientError<AppRouter> => error instanceof TRPCClientError;

    const handleError = (error: unknown) => {
        if (isTRPCClientError(error)) {
            console.log('trpc client error');
            console.log(error.data);
            const errors = JSON.parse(error.message);
            errors.forEach((error: any) => toast.error(error.message));
        } else {
            console.log('new');
            console.log(error);
        }
    };

    return { handleError };
};