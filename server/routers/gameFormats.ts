import { protectedProcedure, router } from '../config';
import { zodErrors, zodHelpers } from '../utils';
import { z } from 'zod';

export const gameFormatRouter = router({
    getGameFormat: protectedProcedure
        .input(z.string(zodErrors.string('id', 'The database id of the game format.')))
        .query(async ({ ctx, input }) =>
            ctx.prisma.gameFormat.findFirst({
                where: { createdBy: ctx.userId, id: input },
            })
        ),
    getGameFormats: protectedProcedure
        .input(
            z
                .object({
                    isArchived: z.coerce
                        .boolean(zodErrors.boolean('archived', 'The archived status of the game format.'))
                        .optional(),
                    name: z.string(zodErrors.string('name', 'The name of the game format.')).optional(),
                })
                .optional()
        )
        .query(async ({ ctx, input }) =>
            ctx.prisma.gameFormat.findMany({
                where: { ...input, createdBy: ctx.userId },
            })
        ),
    // createGameFormat: protectedProcedure
    //   .input(
    //     z.object({
    //       name: z
    //         .string(zodErrors.string("name", "The name for the game format."))
    //         .trim()
    //         .max(48, zodErrors.max("name", 48))
    //         .transform(zodHelpers.lowercase),
    //     })
    //   )
    //   .mutation(async ({ ctx, input }) =>
    //     ctx.prisma.gameFormat.create({
    //       data: { ...input, createdBy: ctx.user.userId },
    //     })
    //   ),
    updateGameFormat: protectedProcedure
        .input(
            z.object({
                id: z.string(zodErrors.string('id', 'The database id of the game format.')),
                data: z.object({
                    isArchived: z
                        .boolean(zodErrors.boolean('isArchived', 'The archived status for the game format.'))
                        .optional(),
                    name: z
                        .string(zodErrors.string('name', 'The name for the game format.'))
                        .trim()
                        .max(48, zodErrors.max('name', 48))
                        .transform(zodHelpers.lowercase)
                        .optional(),
                }),
            })
        )
        .mutation(async ({ ctx, input }) =>
            ctx.prisma.gameFormat.update({
                where: { id: input.id },
                data: input.data,
            })
        ),
    deleteGameFormat: protectedProcedure
        .input(
            z.object({
                id: z.string(zodErrors.string('id', 'The database id of the game format.')),
            })
        )
        .mutation(async ({ ctx, input }) =>
            ctx.prisma.gameFormat.delete({
                where: { id: input.id },
            })
        ),
});
