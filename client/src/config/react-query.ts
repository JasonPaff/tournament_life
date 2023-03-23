import { QueryClient } from '@tanstack/react-query';
import { TRPCClientError } from '@trpc/client';
import toast from 'react-hot-toast';

import type { DefaultOptions } from '@tanstack/react-query';

const defaultOptions: DefaultOptions = {
    mutations: {
        onError: (error) => {
            if (!(error instanceof TRPCClientError)) return;

            // input validation errors.
            if (error.data?.validationErrors) {
                const fieldErrors = Object.values(error.data.validationErrors.fieldErrors).flat();
                fieldErrors.forEach((fieldError) => {
                    if (typeof fieldError !== 'string') return;
                    toast.error(fieldError);
                });
                const formErrors = Object.values(error.data.validationErrors.formErrors).flat();
                formErrors.forEach((formError) => {
                    if (typeof formError !== 'string') return;
                    toast.error(formError);
                });
                return;
            }

            // other errors.
            toast.error(error.message);
        },
    },
    queries: {
        onError: (error) => {
            console.log('QUERY ERROR');
            console.log(error);
        },
    },
};

export const queryClient = new QueryClient({ defaultOptions: defaultOptions });
