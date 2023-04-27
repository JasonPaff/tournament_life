import { protectedProcedure, router } from '../config';
import { zodErrors, zodHelpers } from '../utils';
import { VenueType } from '@prisma/client';
import { z } from 'zod';

export const venueRouter = router({
    getVenue: protectedProcedure
        .input(z.string(zodErrors.string('id', 'The database id of the venue.')))
        .query(async ({ ctx, input }) =>
            ctx.prisma.venue.findFirst({
                where: { createdBy: ctx.userId, id: input },
            })
        ),
    getVenues: protectedProcedure
        .input(
            z
                .object({
                    isArchived: z.coerce
                        .boolean(zodErrors.boolean('archived', 'The archived status of the venue.'))
                        .optional(),
                })
                .optional()
        )
        .query(async ({ ctx, input }) =>
            ctx.prisma.venue.findMany({
                where: { ...input },
            })
        ),
    // createVenue: protectedProcedure
    //   .input(
    //     z.object({
    //       name: z
    //         .string(zodErrors.string("name", "The name for the venue."))
    //         .trim()
    //         .max(48, zodErrors.max("name", 48))
    //         .transform(zodHelpers.lowercase),
    //       type: z
    //         .string(zodErrors.string("type", "The type for the venue."))
    //         .trim()
    //         .refine(
    //           (type) => type === VenueType.Physical || type === VenueType.Virtual,
    //           {
    //             message: `Type must be '${VenueType.Physical}' or '${VenueType.Virtual}'.`,
    //             path: ["type"],
    //           }
    //         )
    //         .transform((type) => {
    //           if (type === VenueType.Physical) return VenueType.Physical;
    //           return VenueType.Virtual;
    //         }),
    //     })
    //   )
    //   .mutation(async ({ ctx, input }) =>
    //     ctx.prisma.venue.create({
    //       data: { ...input, createdBy: ctx.user.userId },
    //     })
    //   ),
    updateVenue: protectedProcedure
        .input(
            z.object({
                id: z.string(zodErrors.string('id', 'The venue id.')),
                data: z.object({
                    isArchived: z
                        .boolean(zodErrors.boolean('isArchived', 'The archived status of the venue.'))
                        .optional(),
                    name: z
                        .string(zodErrors.string('name', 'The name of the venue.'))
                        .trim()
                        .max(48, zodErrors.max('name', 48))
                        .transform(zodHelpers.lowercase)
                        .optional(),
                    type: z
                        .string(zodErrors.string('type', 'The type of the venue.'))
                        .trim()
                        .refine((type) => type === VenueType.Physical || type === VenueType.Virtual, {
                            message: `Type must be '${VenueType.Physical}' or '${VenueType.Virtual}'.`,
                            path: ['type'],
                        })
                        .transform((type) => {
                            if (type === VenueType.Physical) return VenueType.Physical;
                            return VenueType.Virtual;
                        })
                        .optional(),
                }),
            })
        )
        .mutation(async ({ ctx, input }) =>
            ctx.prisma.venue.update({
                where: { id: input.id },
                data: input.data,
            })
        ),
    deleteVenue: protectedProcedure
        .input(
            z.object({
                id: z.string(zodErrors.string('id', 'The database id of the venue.')),
            })
        )
        .mutation(async ({ ctx, input }) =>
            ctx.prisma.venue.delete({
                where: { id: input.id },
            })
        ),
});
