import { ReactQueryOptions, RouterInputs, trpc } from '../../../providers';

type GetVenuesOptions = ReactQueryOptions['venue']['getVenues'];
type GetVenuesInputs = RouterInputs['venue']['getVenues'];

export const useGetVenuesQuery = (input: GetVenuesInputs, opts?: GetVenuesOptions) => {
    return trpc.venue.getVenues.useQuery(input, opts);
};
