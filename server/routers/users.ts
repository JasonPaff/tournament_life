import { protectedProcedure, publicProcedure, router, stytchClient } from '../config';
import { handleError, zodErrors, zodHelpers } from '../utils';
import { z } from 'zod';

import type { User } from '@prisma/client';
import { TRPCError } from '@trpc/server';

export const userRouter = router({
    getUser: protectedProcedure
        .input(z.string(zodErrors.string('ID', 'The id for the user.')))
        .query(async ({ ctx, input }): Promise<User | null> => {
            let user: User | null = null;
            await ctx.prisma.user
                .findFirst({
                    where: { id: input },
                })
                .then((u) => (user = u))
                .catch(handleError);
            return user;
        }),
    getUsers: protectedProcedure.query(async ({ ctx }) => await ctx.prisma.user.findMany()),
    createUser: publicProcedure
        .input(
            z.object({
                displayName: z
                    .string(zodErrors.string('display name', 'The display name for the user.'))
                    .min(1, zodErrors.min('display name', 1)),
                email: z
                    .string(zodErrors.string('email', 'The email address for the user.'))
                    .refine(zodHelpers.validateEmail, zodErrors.invalidEmail)
                    .transform(zodHelpers.normalizeEmail),
                firstName: z.string(zodErrors.string('first name', 'The first name of the user.')),
                lastName: z.string(zodErrors.string('last name', 'The last name of the user.')),
                password: z
                    .string(zodErrors.string('password', 'The password for the user.'))
                    .min(8, zodErrors.min('password', 8)),
            })
        )
        .mutation(async ({ ctx, input }) => {
            // * Check for existing email or duplicate display name.
            const existingUser = await ctx.prisma.user.findFirst({
                where: {
                    OR: [
                        { email: { equals: input.email, mode: 'insensitive' } },
                        { displayName: { equals: input.displayName, mode: 'insensitive' } },
                    ],
                },
            });

            // * Return an error if the email or display name already exists.
            if (existingUser) {
                if (zodHelpers.lowercase(existingUser.email) === zodHelpers.lowercase(input.email))
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: 'A user with that email address already exists',
                    });
                else if (zodHelpers.lowercase(existingUser.displayName) === zodHelpers.lowercase(input.displayName))
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: 'A user with that display name already exists',
                    });
            }

            // * create stytch user account.
            const stytchResponse = await stytchClient.passwords
                .create({ email: input.email, password: input.password })
                .catch(handleError);
            if (!stytchResponse) return null;

            // * Create the user in the database.
            await ctx.prisma.user
                .create({
                    data: {
                        firstName: input.firstName,
                        lastName: input.lastName,
                        displayName: input.displayName,
                        email: input.email,
                        stytchUserId: stytchResponse.user.user_id,
                    },
                })
                .catch((err: unknown) => {
                    // TODO: rollback stytch user account.
                    //await stytchClient.passwords.delete({ userId: res.user.user_id });
                    handleError(err);
                });
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
