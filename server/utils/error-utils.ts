import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { TRPCError } from '@trpc/server';
import { StytchError } from 'stytch';

export const handleError = (err: unknown): TRPCError => {
    if (err instanceof StytchError)
        throw new TRPCError({ cause: err, code: 'BAD_REQUEST', message: err.error_message });
    else if (err instanceof PrismaClientKnownRequestError)
        throw new TRPCError({ cause: err, code: 'BAD_REQUEST', message: err.message });
    else if (err instanceof TRPCError) throw err;
    else throw new TRPCError({ cause: err, code: 'INTERNAL_SERVER_ERROR', message: 'An unknown error occurred.' });
};