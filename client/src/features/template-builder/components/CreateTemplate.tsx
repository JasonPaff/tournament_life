import type { PressEvent } from '@react-types/shared';
import type { Venue } from '@prisma/client';

import { useCreateVenueMutation, useDeleteVenueMutation, useGetVenuesQuery } from '../../../hooks';
import { Button, ComboBox } from '../../../components';

export const CreateTemplate = () => {
    const { data: venues, refetch: refetchVenues } = useGetVenuesQuery({ isArchived: false });
    const { mutateAsync: createVenue } = useCreateVenueMutation();
    const { mutateAsync: deleteVenue } = useDeleteVenueMutation();

    const onCreateVenue = async (event: PressEvent, name: string) => {
        await createVenue({ name, type: 'Physical' }).then(() => refetchVenues());
    };

    const onDeleteVenue = async (venue: Venue) => {
        await deleteVenue({ id: venue.id }).then(() => refetchVenues());
    };

    return (
        <div>
            <ComboBox<Venue>
                allowDelete
                allowCreate
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
