import type { PressEvent } from '@react-types/shared';
import type { Venue } from '@prisma/client';

import { Button, ComboBox } from '../../../components';
import { useVenues } from '../../../hooks';
import { trpc } from '../../../providers';

export const CreateTemplate = () => {
    const utils = trpc.useContext();

    const { getVenuesQuery, createVenueMutation, deleteVenueMutation } = useVenues();

    const { data: venues, isLoading: isLoadingVenues } = getVenuesQuery({ isArchived: false });

    const { mutateAsync: createVenue } = createVenueMutation({
        onError: (error, variables, context) =>
            utils.venue.getVenues.setData({ isArchived: false }, context?.venues ?? []),
        onMutate: async (data) => {
            await utils.venue.getVenues.cancel();
            const venues = utils.venue.getVenues.getData({ isArchived: false }) ?? [];
            utils.venue.getVenues.setData({ isArchived: false }, [...venues, { ...(data as Venue), id: 'temp' }]);
            return { venues };
        },
        onSettled: () => utils.venue.getVenues.invalidate().then(),
    });

    const { mutateAsync: deleteVenue } = deleteVenueMutation({
        onError: (error, variables, context) =>
            utils.venue.getVenues.setData({ isArchived: false }, context?.venues ?? []),
        onMutate: async (data) => {
            await utils.venue.getVenues.cancel();
            const venues = utils.venue.getVenues.getData({ isArchived: false }) ?? [];
            console.log(venues.filter((venue) => venue.id !== data.id));
            utils.venue.getVenues.setData(
                { isArchived: false },
                venues.filter((venue) => venue.id !== data.id)
            );
            return { venues };
        },
        onSettled: () => utils.venue.getVenues.invalidate().then(),
    });

    const onCreateVenue = (event: PressEvent, name: string) => {
        createVenue({ name, type: 'Physical' }).then();
    };

    const onDeleteVenue = async (venue: Venue) => {
        deleteVenue({ id: venue.id }).then();
    };

    return (
        <div>
            <ComboBox<Venue>
                allowDelete
                allowCreate
                busyContent={<div className={'mb-1 text-base'}>Loading Venues...</div>}
                createContent={(query) => (
                    <div className={'cursor-default select-none px-4 pb-1'}>
                        <Button onPress={(event) => onCreateVenue(event, query)} size={'sm'}>
                            <span className={'text-base'}>Create Venue?</span>
                        </Button>
                    </div>
                )}
                displayValue={(venue) => venue.name}
                filter={(query) =>
                    venues?.filter((person) =>
                        person.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
                    ) ?? []
                }
                isBusy={isLoadingVenues}
                items={venues ?? []}
                label={'Venue'}
                notFoundContent={
                    <div className={'cursor-default select-none px-4'}>
                        <div className={'mb-1 text-base'}>No Matching Venues Found.</div>
                    </div>
                }
                onDelete={onDeleteVenue}
                optionKey={(venue) => venue.id}
            />
        </div>
    );
};
