import { protectedProcedure, router } from '../config';
import { zodErrors, zodHelpers } from '../utils';
import { z } from 'zod';

export const templatesRouter = router({
    getTemplate: protectedProcedure
        .input(z.string(zodErrors.string('id', 'The database id of the tournament.')))
        .query(async ({ ctx, input }) =>
            ctx.prisma.template.findFirst({
                where: { createdBy: ctx.userId, id: input },
            })
        ),
    getTemplates: protectedProcedure
        .input(
            z
                .object({
                    isArchived: z
                        .boolean(zodErrors.boolean('archived', 'The archived status of the tournament.'))
                        .optional(),
                    name: z.string(zodErrors.string('name', 'The name of the tournament.')).optional(),
                })
                .optional()
        )
        .query(async ({ ctx, input }) =>
            ctx.prisma.template.findMany({
                include: { gameFormats: true },
                where: { ...input, createdBy: ctx.userId },
            })
        ),
    // createTemplate: protectedProcedure
    //     .input(
    //         z.object({
    //             create: z.object({
    //                 addonChips: z
    //                     .number(zodErrors.number('addonChips', 'The number of addon chips for the tournament.'))
    //                     .min(0, zodErrors.min('addonChips', 0))
    //                     .nullable(),
    //                 addonCost: z
    //                     .number(zodErrors.number('addonCost', 'The addon cost for the tournament.'))
    //                     .min(0, zodErrors.min('addonCost', 0))
    //                     .nullable(),
    //                 addonFee: z
    //                     .number(zodErrors.number('addonFee', 'The addon fee for the tournament.'))
    //                     .min(0, zodErrors.min('addonFee', 0))
    //                     .nullable(),
    //                 blindLvlMinutes: z
    //                     .number(
    //                         zodErrors.number('blindLvlMinutes', 'The blind level time (in minutes) for the tournament.')
    //                     )
    //                     .min(0, zodErrors.min('blindLvlMinutes', 0))
    //                     .nullable(),
    //                 entryCost: z
    //                     .number(zodErrors.number('entryCost', 'The entry cost for the tournament.'))
    //                     .min(0, zodErrors.min('entryCost', 0))
    //                     .nullable(),
    //                 entryFee: z
    //                     .number(zodErrors.number('entryFee', 'The entry fee for the tournament.'))
    //                     .min(0, zodErrors.min('entryFee', 0))
    //                     .nullable(),
    //                 fixedBounty: z
    //                     .number(zodErrors.number('fixedBounty', 'The fixed bounty prize for the tournament.'))
    //                     .min(0, zodErrors.min('fixedBounty', 0))
    //                     .nullable(),
    //                 gameType: z.string(zodErrors.string('gameType', 'The game type id for the tournament.')).nullable(),
    //                 guarantee: z
    //                     .number(zodErrors.number('guarantee', 'The guarantee for the tournament.'))
    //                     .min(0, zodErrors.min('guarantee', 0))
    //                     .nullable(),
    //                 isSng: z
    //                     .boolean(zodErrors.boolean('isSng', 'The sit and go status for the tournament.'))
    //                     .optional(),
    //                 lateRegMinutes: z
    //                     .number(zodErrors.number('lateRegistration', 'The late registration time for the tournament.'))
    //                     .min(0, zodErrors.min('lateRegistration', 0))
    //                     .nullable(),
    //                 name: z
    //                     .string(zodErrors.string('name', 'The name for the tournament.'))
    //                     .trim()
    //                     .max(48, zodErrors.max('name', 48))
    //                     .transform(zodHelpers.lowercase),
    //                 rebuyChips: z
    //                     .number(zodErrors.number('rebuyChips', 'The number of rebuy chips for the tournament.'))
    //                     .min(0, zodErrors.min('rebuyChips', 0))
    //                     .nullable(),
    //                 rebuyCost: z
    //                     .number(zodErrors.number('rebuyCost', 'The rebuy cost for the tournament.'))
    //                     .min(0, zodErrors.min('rebuyCost', 0))
    //                     .nullable(),
    //                 rebuyFee: z
    //                     .number(zodErrors.number('rebuyFee', 'The rebuy fee for the tournament.'))
    //                     .min(0, zodErrors.min('rebuyFee', 0))
    //                     .nullable(),
    //                 startingChips: z
    //                     .number(zodErrors.number('startingChips', 'The number of starting chips for the tournament.'))
    //                     .min(0, zodErrors.min('startingChips', 0))
    //                     .nullable(),
    //                 startTime: z
    //                     .string(zodErrors.date('startTime', 'The start time for the tournament.'))
    //                     .datetime({ offset: true })
    //                     .nullable(),
    //                 tableSize: z
    //                     .number(zodErrors.number('tableSize', 'The table size for the tournament.'))
    //                     .min(2, zodErrors.min('tableSize', 2))
    //                     .nullable(),
    //                 venue: z.string(zodErrors.string('venue', 'The venue id for the tournament.')).nullable(),
    //             }),
    //             gameFormats: z
    //                 .array(
    //                     z.object({
    //                         id: z.string(zodErrors.string('gameFormat', 'A game format for the tournament.')),
    //                     })
    //                 )
    //                 .optional(),
    //         })
    //     )
    //     .mutation(async ({ ctx, input }) =>
    //         ctx.prisma.template.create({
    //             data: {
    //                 createdBy: ctx.userId,
    //                 ...input.create,
    //             },
    //             include: { gameFormats: true },
    //         })
    //     ),
    updateTemplate: protectedProcedure
        .input(
            z.object({
                id: z.string(zodErrors.string('id', 'The database id of the tournament.')),
                update: z.object({
                    addonChips: z
                        .number(zodErrors.number('addonChips', 'The number of addon chips for the tournament.'))
                        .min(0, zodErrors.min('addonChips', 0))
                        .nullish(),
                    addonCost: z
                        .number(zodErrors.number('addonCost', 'The addon cost for the tournament.'))
                        .min(0, zodErrors.min('addonCost', 0))
                        .nullish(),
                    addonFee: z
                        .number(zodErrors.number('addonFee', 'The addon fee for the tournament.'))
                        .min(0, zodErrors.min('addonFee', 0))
                        .nullish(),
                    blindLvlMinutes: z
                        .number(
                            zodErrors.number('blindLvlMinutes', 'The blind level time (in minutes) for the tournament.')
                        )
                        .min(0, zodErrors.min('blindLvlMinutes', 0))
                        .nullish(),
                    entryCost: z
                        .number(zodErrors.number('entryCost', 'The entry cost for the tournament.'))
                        .min(0, zodErrors.min('entryCost', 0))
                        .nullish(),
                    entryFee: z
                        .number(zodErrors.number('entryFee', 'The entry fee for the tournament.'))
                        .min(0, zodErrors.min('entryFee', 0))
                        .nullish(),
                    fixedBounty: z
                        .number(zodErrors.number('fixedBounty', 'The fixed bounty prize for the tournament.'))
                        .min(0, zodErrors.min('fixedBounty', 0))
                        .nullish(),
                    gameTypeId: z.string(zodErrors.string('gameTypeId', 'The game type for the tournament.')).nullish(),
                    guarantee: z
                        .number(zodErrors.number('guarantee', 'The guarantee for the tournament.'))
                        .min(0, zodErrors.min('guarantee', 0))
                        .nullish(),
                    isArchived: z
                        .boolean(zodErrors.boolean('isArchived', 'The archived status for the tournament.'))
                        .optional(),
                    isSng: z
                        .boolean(zodErrors.boolean('isSng', 'The sit and go status for the tournament.'))
                        .optional(),
                    lateRegMinutes: z
                        .number(
                            zodErrors.number(
                                'lateRegistration',
                                'The late registration time (in minutes) for the tournament.'
                            )
                        )
                        .min(0, zodErrors.min('lateRegistration', 0))
                        .nullish(),
                    name: z
                        .string(zodErrors.string('name', 'The name for the tournament.'))
                        .trim()
                        .max(64, zodErrors.max('name', 64))
                        .transform(zodHelpers.lowercase)
                        .optional(),
                    rebuyChips: z
                        .number(zodErrors.number('rebuyChips', 'The number of rebuy chips for the tournament.'))
                        .min(0, zodErrors.min('rebuyChips', 0))
                        .nullish(),
                    rebuyCost: z
                        .number(zodErrors.number('rebuyCost', 'The rebuy cost for the tournament.'))
                        .min(0, zodErrors.min('rebuyCost', 0))
                        .nullish(),
                    rebuyFee: z
                        .number(zodErrors.number('rebuyFee', 'The rebuy fee for the tournament.'))
                        .min(0, zodErrors.min('rebuyFee', 0))
                        .nullish(),
                    startingChips: z
                        .number(zodErrors.number('startingChips', 'The number of starting chips for the tournament.'))
                        .min(0, zodErrors.min('startingChips', 0))
                        .nullish(),
                    startTime: z
                        .string(zodErrors.date('startTime', 'The start time for the tournament.'))
                        .datetime({ offset: true })
                        .nullable(),
                    tableSize: z
                        .number(zodErrors.number('tableSize', 'The table size for the tournament.'))
                        .min(2, zodErrors.min('tableSize', 2))
                        .nullish(),
                    venueId: z.string(zodErrors.string('venueId', 'The venue for the tournament.')).nullish(),
                }),
                gameFormats: z
                    .array(
                        z.object({
                            id: z.string(zodErrors.string('gameFormat', 'A game format for the tournament.')),
                        })
                    )
                    .optional(),
            })
        )
        .mutation(async ({ ctx, input }) =>
            ctx.prisma.template.update({
                where: { id: input.id },
                data: { ...input.update, gameFormats: { connect: input.gameFormats } },
                include: { gameFormats: true },
            })
        ),
    deleteTemplate: protectedProcedure
        .input(
            z.object({
                id: z.string(zodErrors.string('id', 'The database id of the tournament.')),
            })
        )
        .mutation(async ({ ctx, input }) =>
            ctx.prisma.template.delete({
                where: { id: input.id },
            })
        ),
});
