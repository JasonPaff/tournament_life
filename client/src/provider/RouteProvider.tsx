import { Outlet, ReactRouter, RouterProvider } from '@tanstack/react-router';
import { dashboardRoute } from '../features';
import { RootRoute } from '@tanstack/router';
import { NavBar } from '../components';
import { DevProvider } from './DevProvider';

// register the router for maximum type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

export const rootRoute = new RootRoute({
    component: () => (
        <div
            className={
                'flex min-h-screen w-full flex-col items-center space-y-4 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100'
            }
        >
            <NavBar />
            <hr />
            {/* This is where child routes will render */}
            <Outlet />
            <DevProvider />
        </div>
    ),
});

// create the route tree using our routes
const routeTree = rootRoute.addChildren([dashboardRoute]);

// create the router using the route tree
export const router = new ReactRouter({
    routeTree,
    defaultPreload: 'intent',
});

export const RouteProvider = () => <RouterProvider router={router} />;
