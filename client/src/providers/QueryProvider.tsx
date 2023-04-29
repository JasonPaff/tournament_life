import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, TRPCClientError } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import superjson from 'superjson';

import type { inferReactQueryProcedureOptions } from '@trpc/react-query';
import type { DefaultOptions } from '@tanstack/react-query';
import type { AppRouter } from '../../../server/routers';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const trpc = createTRPCReact<AppRouter>();

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

export const QueryProvider: FCC = ({ children }) => {
    const { getToken } = useAuth();

    const [token, setToken] = useState<string>();

    useEffect(() => {
        (async () => {
            setToken(`Bearer ${await getToken()}`);
        })();
    }, []);

    if (!token) return <></>;

    const trpcClient = trpc.createClient({
        links: [
            httpBatchLink({
                url: import.meta.env.VITE_REACT_APP_API,
                headers: {
                    Authorization: token,
                },
            }),
        ],
        transformer: superjson,
    });

    return (
        <trpc.Provider abortOnUnmount client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    );
};
