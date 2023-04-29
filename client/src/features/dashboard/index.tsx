import { rootRoute } from '../../providers';
import { Route } from '@tanstack/router';
import { Dashboard } from './components';

export const dashboardRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'dashboard',
    component: () => <Dashboard />,
});
