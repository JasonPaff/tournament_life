import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const DevProvider = () => {
    if (!import.meta.env.DEV) return <></>;

    return (
        <>
            <ReactQueryDevtools
                position="bottom-right"
                toggleButtonProps={{
                    style: {
                        marginRight: '4.5rem',
                        transform: `scale(.6)`,
                        transformOrigin: 'bottom left',
                    },
                }}
            />
            <TanStackRouterDevtools position={'bottom-right'} />
        </>
    );
};
