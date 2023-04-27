import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const DevProvider = () => {
    if (!import.meta.env.DEV) return <></>;

    return (
        <>
            <ReactQueryDevtools initialIsOpen={false} position={'top-right'} />
            <TanStackRouterDevtools position={'bottom-right'} />
        </>
    );
};
