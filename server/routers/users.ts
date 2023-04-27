import { protectedProcedure, router } from '../config';
import { z } from 'zod';

export const usersRouter = router({
    createUser: protectedProcedure
        .input(z.object({ username: z.string(), id: z.string() }))
        .mutation(async ({ ctx, input }) => {}),
});
