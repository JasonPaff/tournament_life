import { dashboardRoute, registerRoute, rootRoute, signInRoute } from '../features';
import { ReactRouter } from '@tanstack/react-router';

// create the route tree using our routes
const routeTree = rootRoute.addChildren([dashboardRoute, registerRoute, signInRoute]);

// create the router using the route tree
export const router = new ReactRouter({
    routeTree,
    defaultPreload: 'intent',
});

// register the router for maximum type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
