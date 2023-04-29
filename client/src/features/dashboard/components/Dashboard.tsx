import { useGetVenuesQuery } from '../../../hooks';
import { useUser } from '@clerk/clerk-react';

export const Dashboard = () => {
    const { user } = useUser();

    const { data } = useGetVenuesQuery();

    return (
        <div className={'grid grid-cols-2 gap-y-1'}>
            <span className={'font-mediums'}>Name:</span>
            <span>{user?.fullName}</span>
            <span className={'font-mediums'}>Id:</span>
            <span>{user?.id}</span>
            <ul>
                {data?.map((venue) => (
                    <li key={venue.id}>{venue.name}</li>
                ))}
            </ul>
        </div>
    );
};
