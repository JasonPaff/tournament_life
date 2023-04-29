import { Statistics } from './components';
import { Route } from '@tanstack/router';
import { rootRoute } from '../../providers';

export const statisticsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'statistics',
    component: () => <Statistics />,
});
