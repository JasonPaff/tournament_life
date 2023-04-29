import { ReactQueryOptions, trpc } from '../../../providers';

type CreateVenueOptions = ReactQueryOptions['venue']['createVenue'];

export const useCreateVenueMutation = (opts?: CreateVenueOptions) => {
    return trpc.venue.createVenue.useMutation(opts);
};
