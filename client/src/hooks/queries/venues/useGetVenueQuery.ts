import { ReactQueryOptions, RouterInputs, trpc } from '../../../providers';

type GetVenueOptions = ReactQueryOptions['venue']['getVenue'];
type GetVenueInputs = RouterInputs['venue']['getVenue'];

export const useGetVenueQuery = (input: GetVenueInputs, opts?: GetVenueOptions) => {
    return trpc.venue.getVenue.useQuery(input, opts);
};
