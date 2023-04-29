import { rootRoute } from '../../providers';
import { Tournaments } from './components';
import { Route } from '@tanstack/router';

export const tournamentsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'tournaments',
    component: () => <Tournaments />,
});
