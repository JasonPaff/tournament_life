import { Outlet, Router, RouterProvider } from '@tanstack/router';
import { Sidebar, TailwindToaster } from '../components';
import { RootRoute } from '@tanstack/router';
import { DevProvider } from './DevProvider';
import {
    bankrollRoute,
    createTemplateRoute,
    sessionBuilderRoute,
    settingsRoute,
    statisticsRoute,
    templateBuilderRoute,
    tournamentsRoute,
} from '../features';

// register the router for maximum type safety
declare module '@tanstack/router' {
    interface Register {
        router: typeof router;
    }
}

export const rootRoute = new RootRoute({
    component: () => (
        <div className={'min-h-screen bg-slate-100 text-gray-900 dark:bg-slate-900 dark:text-gray-100'}>
            <Sidebar />
            <div className={'min-h-screen lg:pl-72'}>
                <main className={'pt-12'}>
                    <div className={'px-4 sm:px-6 lg:px-8'}>
                        {/* This is where child routes will render */}
                        <Outlet />
                    </div>
                </main>
            </div>
            <TailwindToaster />
            <DevProvider />
        </div>
    ),
});

// create the route tree using our routes
const routeTree = rootRoute.addChildren([
    bankrollRoute,
    sessionBuilderRoute,
    settingsRoute,
    statisticsRoute,
    templateBuilderRoute.addChildren([createTemplateRoute]),
    tournamentsRoute,
]);

// create the router using the route tree
export const router = new Router({
    routeTree,
    defaultPreload: 'intent',
});

export const RouteProvider = () => <RouterProvider router={router} />;
