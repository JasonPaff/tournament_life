import { clerkClient, LooseAuthProp } from '@clerk/clerk-sdk-node';
import * as trpcExpress from '@trpc/server/adapters/express';
import { initTRPC, TRPCError } from '@trpc/server';
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

export const createInnerTrpcContext = async (userId: string) => {
    const user = await clerkClient.users.getUser(userId);

    return {
        prisma,
        user: user,
        userId: user.id,
    };
};

export const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
    const contextInner = await createInnerTrpcContext(req.auth.userId);

    return {
        ...contextInner,
        req,
        res,
    };
};

const isAuthed = trpc.middleware(({ ctx, next }) => {
    if (!ctx.user?.id) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not Authorized!' });
    return next();
});

export const middleware = trpc.middleware;
export const router = trpc.router;
export const publicProcedure = trpc.procedure;
export const protectedProcedure = trpc.procedure.use(isAuthed);
