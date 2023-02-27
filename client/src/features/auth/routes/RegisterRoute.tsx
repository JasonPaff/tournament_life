import { Route } from '@tanstack/react-router';
import { rootRoute } from '../../RootRoute';
import { Register } from '../components';

export const registerRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'register',
    component: () => <Register />,
});