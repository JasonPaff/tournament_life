import { Route } from '@tanstack/react-router';
import { rootRoute } from '../../RootRoute';
import { Dashboard } from '../components';

export const dashboardRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'dashboard',
    component: () => <Dashboard />,
});