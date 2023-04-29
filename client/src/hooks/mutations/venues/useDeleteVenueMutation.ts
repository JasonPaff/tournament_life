import { ReactQueryOptions, trpc } from '../../../providers';

type DeleteVenueOptions = ReactQueryOptions['venue']['deleteVenue'];

export const useDeleteVenueMutation = (opts?: DeleteVenueOptions) => {
    return trpc.venue.deleteVenue.useMutation(opts);
};
