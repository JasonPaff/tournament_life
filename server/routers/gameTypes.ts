import { protectedProcedure, router } from '../config';
import { zodErrors, zodHelpers } from '../utils';
import { z } from 'zod';

export const gameTypeRouter = router({
    getGameType: protectedProcedure
        .input(z.string(zodErrors.string('id', 'The database id of the game type.')))
        .query(async ({ ctx, input }) =>
            ctx.prisma.gameType.findFirst({
                where: { createdBy: ctx.userId, id: input },
            })
        ),
    getGameTypes: protectedProcedure
        .input(
            z
                .object({
                    isArchived: z
                        .boolean(zodErrors.boolean('archived', 'The archived status of the game type.'))
                        .optional(),
                    name: z.string(zodErrors.string('name', 'The name of the game type.')).optional(),
                })
                .optional()
        )
        .query(async ({ ctx, input }) =>
            ctx.prisma.gameType.findMany({
                where: { ...input, createdBy: ctx.userId },
            })
        ),
    // createGameType: protectedProcedure
    //   .input(
    //     z.object({
    //       name: z
    //         .string(zodErrors.string("name", "The name for the game type."))
    //         .trim()
    //         .max(48, zodErrors.max("name", 48))
    //         .transform(zodHelpers.lowercase),
    //     })
    //   )
    //   .mutation(async ({ ctx, input }) =>
    //     ctx.prisma.gameType.create({
    //       data: { ...input, createdBy: ctx.userId },
    //     })
    //   ),
    updateGameType: protectedProcedure
        .input(
            z.object({
                id: z.string(zodErrors.string('id', 'The database id of the game type.')),
                data: z.object({
                    isArchived: z.coerce
                        .boolean(zodErrors.boolean('isArchived', 'The archived status for the game type.'))
                        .optional(),
                    name: z.coerce
                        .string(zodErrors.string('name', 'The name for the game type.'))
                        .trim()
                        .max(48, zodErrors.max('name', 48))
                        .transform(zodHelpers.lowercase)
                        .optional(),
                }),
            })
        )
        .mutation(async ({ ctx, input }) =>
            ctx.prisma.gameType.update({
                where: { id: input.id },
                data: input.data,
            })
        ),
    deleteGameType: protectedProcedure
        .input(
            z.object({
                id: z.string(zodErrors.string('id', 'The database id of the game type.')),
            })
        )
        .mutation(async ({ ctx, input }) =>
            ctx.prisma.gameType.delete({
                where: { id: input.id },
            })
        ),
});
