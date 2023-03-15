import { trpc } from '../../../config';
import React from 'react';

export const Dashboard = () => {
    const { data: user, isLoading, isError } = trpc.user.getUser.useQuery('clc49kkv10000jppk1wl2sz33');

    if (isLoading) return <div className={'animate-pulse text-4xl text-gray-800'}>Loading...</div>;

    if (isError) return <div className={'text-4xl text-gray-800'}>Error!</div>;

    return (
        <div className={'grid grid-cols-2 gap-y-1 text-gray-800'}>
            <span className={'font-mediums'}>Name:</span>
            <span>{user?.name}</span>
            <span className={'font-mediums'}>Display Name:</span>
            <span>{user?.displayName}</span>
            <span className={'font-mediums'}>Email:</span>
            <span>{user?.email}</span>
        </div>
    );
};