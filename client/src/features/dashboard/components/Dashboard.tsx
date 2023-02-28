import {trpc} from "../../../config";
import React from "react";

export const Dashboard = () => {
    // Local
    // const {
    //     data: user,
    //     isLoading,
    //     isError,
    // } = trpc.user.getUser.useQuery('bb8516a2-4fbb-48d4-8e31-e2fb6649e424');

    // ElephantSQL
    const {
        data: user,
        isLoading,
        isError,
    } = trpc.user.getUser.useQuery('clc49kkv10000jppk1wl2sz33');

    if (isLoading) return <div className={'animate-pulse text-4xl'}>Loading...</div>;

    if (isError) return <div className={'text-4xl'}>Error!</div>;

    return <div className={'grid grid-cols-2 gap-y-1'}>
        <span className={'font-mediums'}>Name:</span>
        <span>{user?.name}</span>
        <span className={'font-mediums'}>Display Name:</span>
        <span>{user?.displayName}</span>
        <span className={'font-mediums'}>Email:</span>
        <span>{user?.email}</span>
    </div>;
};