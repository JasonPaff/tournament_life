import { trpc } from '../../../config';

export const Dashboard = () => {
    const { data: user, isLoading, isError } = trpc.user.getUser.useQuery('ddc945fc-2392-47e7-8586-eadf75de8839');

    if (isLoading) return <div className={'animate-pulse text-4xl'}>Loading...</div>;

    if (isError) return <div className={'text-4xl'}>Error!</div>;

    return (
        <div className={'grid grid-cols-2 gap-y-1'}>
            <span className={'font-mediums'}>Name:</span>
            <span>{`${user?.firstName} ${user?.lastName}`}</span>
            <span className={'font-mediums'}>Display Name:</span>
            <span>{user?.displayName}</span>
            <span className={'font-mediums'}>Email:</span>
            <span>{user?.email}</span>
        </div>
    );
};
