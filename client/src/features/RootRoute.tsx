import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Link, Outlet } from '@tanstack/react-router';
import { RootRoute } from '@tanstack/router';

export const rootRoute = new RootRoute({
    component: () => (
        <div className={'flex min-h-screen flex-col items-center space-y-4'}>
            <RouteTestBar />
            <hr />
            <Outlet /> {/* This is where child routes will render */}
            <TanStackRouterDevtools position={'bottom-left'} />
        </div>
    ),
});

const RouteTestBar = () => {
    return (
        <div className={'flex space-x-4 text-lg'}>
            <Link activeProps={{ className: 'font-bold' }} to={'/dashboard'}>
                Dashboard
            </Link>
            <Link activeProps={{ className: 'font-bold' }} to={'/register'}>
                Register
            </Link>
            <Link activeProps={{ className: 'font-bold' }} to={'/signIn'}>
                Sign-In
            </Link>
        </div>
    );
};