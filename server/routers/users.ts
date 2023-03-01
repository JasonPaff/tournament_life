import { handleError, zodErrors, zodHelpers } from '../utils';
import { z } from 'zod';
import { protectedProcedure, publicProcedure, router, stytchClient } from '../config';

export const userRouter = router({
    getUser: protectedProcedure
        .input(z.string(zodErrors.string('ID', 'The database id of the user.')))
        .query(async ({ ctx, input }) =>
            ctx.prisma.user.findFirst({
                where: { id: input },
            })
        ),
    getUsers: protectedProcedure.query(async ({ ctx }) => await ctx.prisma.user.findMany()),
    createUser: publicProcedure
        .input(
            z.object({
                displayName: z
                    .string(zodErrors.string('display name', 'The display name for the user.'))
                    .min(4, zodErrors.min('display name', 4)),
                email: z
                    .string(zodErrors.string('email', 'The email address for the user.'))
                    .refine(zodHelpers.validateEmail, zodErrors.invalidEmail)
                    .transform(zodHelpers.normalizeEmail),
                name: z.string(zodErrors.string('name', 'The full name for the user.')).nullish(),
                password: z
                    .string(zodErrors.string('password', 'The password for the user.'))
                    .min(8, zodErrors.min('password', 8)),
            })
        )
        .mutation(async ({ ctx, input }) => {
            // * create stytch user account.
            const stytchResponse = await stytchClient.passwords
                .create({ email: input.email, password: input.password })
                .catch(handleError);
            if (!stytchResponse) return null;
            console.log('STYTCH USER CREATED!', stytchResponse);

            // * Create the user in the database.
            const user = await ctx.prisma.user
                .create({
                    data: {
                        displayName: input.displayName,
                        email: input.email,
                        name: input.name,
                        stytchUserId: stytchResponse.user.user_id,
                    },
                })
                .catch(async (err: unknown) => {
                    console.log('PRISMA ERROR!', err);
                    // TODO: rollback stytch user account.
                    //await stytchClient.passwords.delete({ userId: res.user.user_id });
                    handleError(err);
                });
            console.log('USER CREATED!', user);

            return user;
        }),
    updateUser: protectedProcedure
        .input(
            z.object({
                id: z.string(zodErrors.string('id')),
                data: z.object({
                    displayName: z.coerce
                        .string(zodErrors.string('display name'))
                        .min(4, zodErrors.min('display name', 4))
                        .optional(),
                    email: z
                        .string(zodErrors.string('email'))
                        .refine(zodHelpers.validateEmail, zodErrors.invalidEmail)
                        .optional(),
                    name: z.string(zodErrors.string('name')).nullish(),
                }),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (input.data.email) {
                // TODO: update email on Stytch.
            }
            return ctx.prisma.user.update({
                where: { id: input.id },
                data: input.data,
            });
        }),
    deleteUser: protectedProcedure
        .input(z.object({ id: z.string(zodErrors.string('id')) }))
        .mutation(async ({ ctx, input }) => {
            // TODO: delete stytch user account.

            return ctx.prisma.user.delete({
                where: { id: input.id },
            });
        }),
});