import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Link, Outlet } from '@tanstack/react-router';
import { RootRoute } from '@tanstack/router';

export const rootRoute = new RootRoute({
    component: () => (
        <div
            className={
                'flex min-h-screen w-full flex-col items-center space-y-4 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100'
            }
        >
            <RouteTestBar />
            <hr />
            <Outlet /> {/* This is where child routes will render */}
            <ReactQueryDevtools initialIsOpen={false} position={'top-left'} />
            <TanStackRouterDevtools position={'bottom-left'} />
        </div>
    ),
});

const RouteTestBar = () => {
    return (
        <div className={'flex w-full justify-center'}>
            <div />
            <div className={'space-x-4 text-lg'}>
                <Link activeProps={{ className: 'font-bold' }} to={'/dashboard'}>
                    Dashboard
                </Link>
            </div>
        </div>
    );
};
