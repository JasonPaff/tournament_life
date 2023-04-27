import { trpc } from '../../provider';

export const useVenueQuery = (isArchived = false) => {
    return trpc.venue.getVenues.useQuery({ isArchived });
};
