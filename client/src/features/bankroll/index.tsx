import { rootRoute } from '../../providers';
import { Route } from '@tanstack/router';
import { Bankroll } from './components';

export const bankrollRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'bankroll',
    component: () => <Bankroll />,
});
