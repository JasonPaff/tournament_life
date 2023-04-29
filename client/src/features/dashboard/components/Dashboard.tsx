import { useUser } from '@clerk/clerk-react';

export const Dashboard = () => {
    const { user } = useUser();

    return (
        <div className={'grid grid-cols-2 gap-y-1'}>
            <span className={'font-mediums'}>Name:</span>
            <span>{user?.fullName}</span>
            <span className={'font-mediums'}>Id:</span>
            <span>{user?.id}</span>
        </div>
    );
};
