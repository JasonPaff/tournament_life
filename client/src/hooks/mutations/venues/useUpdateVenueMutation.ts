import { ReactQueryOptions, trpc } from '../../../providers';

type UpdateVenueOptions = ReactQueryOptions['venue']['updateVenue'];

export const useUpdateVenueMutation = (opts?: UpdateVenueOptions) => {
    return trpc.venue.updateVenue.useMutation(opts);
};
