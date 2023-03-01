import {createTRPCReact} from '@trpc/react-query';
import {httpBatchLink} from '@trpc/client';

import type {inferReactQueryProcedureOptions} from '@trpc/react-query';
import type {inferRouterInputs} from '@trpc/server';
import {AppRouter} from "../../../server/routers";

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
           // url: 'http://localhost:5000/trpc',
           url: 'https://tournament-life.azurewebsites.net/trpc',
        }),
    ],
});