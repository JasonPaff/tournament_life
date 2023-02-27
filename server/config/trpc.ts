import * as trpcExpress from '@trpc/server/adapters/express';
import { initTRPC } from '@trpc/server';
import { prisma } from './prisma';
import { ZodError } from 'zod';

import type { inferAsyncReturnType } from '@trpc/server';

type Context = inferAsyncReturnType<typeof createContext>;

// * Trpc with a custom error formatter to return zod validation errors.
export const trpc = initTRPC.context<Context>().create({
    errorFormatter({ error, input, path, shape, type }) {
        return {
            code: shape.code,
            data: {
                ...shape.data,
                validationErrors:
                    error.code === 'BAD_REQUEST' && error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
            errorCode: error.code,
            input: input,
            message: shape.message,
            path: path,
            type: type,
        };
    },
});

export const createContextInner = async () => {
    // TODO: Use authed user.
    return {
        prisma,
        user: { userId: '855facd2-e789-4f67-8657-dc8c7bbc9593' },
    };
};

export const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
    const contextInner = await createContextInner();

    return {
        ...contextInner,
        req,
        res,
    };
};

const isAuthed = trpc.middleware(({ next }) => {
    // TODO: Actually auth.
    return next();
});

export const middleware = trpc.middleware;
export const router = trpc.router;
export const publicProcedure = trpc.procedure;
export const protectedProcedure = trpc.procedure.use(isAuthed);