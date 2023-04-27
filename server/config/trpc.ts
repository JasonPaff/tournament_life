import * as trpcExpress from '@trpc/server/adapters/express';
import { LooseAuthProp } from '@clerk/clerk-sdk-node';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { prisma } from './prisma';
import { ZodError } from 'zod';

declare global {
    namespace Express {
        interface Request extends LooseAuthProp {}
    }
}

// * Trpc with a custom error formatter to return zod validation errors.
export const trpc = initTRPC.context<typeof createContext>().create({
    errorFormatter({ error, input, path, shape, type }) {
        return {
            code: shape.code,
            data: {
                ...shape.data,
                zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
            errorCode: error.code,
            input: input,
            message: shape.message,
            path: path,
            type: type,
        };
    },
    transformer: superjson,
});

export const createInnerTrpcContext = (userId: string) => {
    return {
        prisma,
        userId: userId,
    };
};

export const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
    const contextInner = createInnerTrpcContext(req.auth.userId);

    return {
        ...contextInner,
        req,
        res,
    };
};

const isAuthed = trpc.middleware(({ ctx, next }) => {
    if (!ctx.userId) throw new Error('Not Authorized!');
    return next();
});

export const middleware = trpc.middleware;
export const router = trpc.router;
export const publicProcedure = trpc.procedure;
export const protectedProcedure = trpc.procedure.use(isAuthed);
