import { ReactQueryOptions, RouterInputs, trpc } from '../../providers';

type CreateVenueOptions = ReactQueryOptions['venue']['createVenue'];
type DeleteVenueOptions = ReactQueryOptions['venue']['deleteVenue'];
type GetVenueInputs = RouterInputs['venue']['getVenue'];
type GetVenueOptions = ReactQueryOptions['venue']['getVenue'];
type GetVenuesOptions = ReactQueryOptions['venue']['getVenues'];
type GetVenuesInputs = RouterInputs['venue']['getVenues'];
type UpdateVenueOptions = ReactQueryOptions['venue']['updateVenue'];

export type CreateVenueInput = RouterInputs['venue']['createVenue'];

export const useVenues = () => {
    const createVenueMutation = (opts?: CreateVenueOptions) => trpc.venue.createVenue.useMutation(opts);
    const deleteVenueMutation = (opts?: DeleteVenueOptions) => trpc.venue.deleteVenue.useMutation(opts);
    const getVenueQuery = (input: GetVenueInputs, opts?: GetVenueOptions) => trpc.venue.getVenue.useQuery(input, opts);
    const getVenuesQuery = (input: GetVenuesInputs, opts?: GetVenuesOptions) =>
        trpc.venue.getVenues.useQuery(input, opts);
    const updateVenueMutation = (opts?: UpdateVenueOptions) => trpc.venue.updateVenue.useMutation(opts);

    return { createVenueMutation, deleteVenueMutation, getVenueQuery, getVenuesQuery, updateVenueMutation };
};
