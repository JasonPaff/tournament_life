import {trpc} from "../../config";
import React from 'react';

export const Profile = () => {
    const {
        data: user,
        isLoading,
        isError,
        refetch: refetchUser,
    } = trpc.user.getUser.useQuery('clc49kkv10000jppk1wl2sz33');

    const { mutate: updateUser } = trpc.user.updateUser.useMutation();

    const onUpdate = () => {
        updateUser({
            id: 'fake',
            data: { displayName: 'jason' },
        });
        refetchUser().then();
    };

    if (isLoading) return <div className={'animate-pulse text-4xl'}>Loading...</div>;

    if (isError) return <div className={'text-4xl'}>Error!</div>;

    return (
        <div className={'grid grid-cols-2 gap-y-1'}>
            <span className={'font-mediums'}>Name:</span>
            <span>{user?.name}</span>
            <span className={'font-mediums'}>Display Name:</span>
            <span>{user?.displayName}</span>
            <span className={'font-mediums'}>Email:</span>
            <span>{user?.email}</span>

            <button className={'mt-10'} onClick={onUpdate}>
                Update
            </button>
        </div>
    );
};