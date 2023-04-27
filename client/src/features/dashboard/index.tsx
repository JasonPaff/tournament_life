import { Route } from '@tanstack/react-router';
import { rootRoute } from '../../provider';
import { Dashboard } from './components';

export const dashboardRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'dashboard',
    component: () => <Dashboard />,
});
