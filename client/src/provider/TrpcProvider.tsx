import { QueryClientProvider } from '@tanstack/react-query';
import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import { queryClient } from '../config';
import superjson from 'superjson';

import type { inferReactQueryProcedureOptions } from '@trpc/react-query';
import type { AppRouter } from '../../../server/routers';
import type { inferRouterInputs } from '@trpc/server';
import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;

export const trpc = createTRPCReact<AppRouter>();

export const TrpcProvider: FCC = ({ children }) => {
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
                headers: { Authorization: token },
            }),
        ],
        transformer: superjson,
    });

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    );
};
