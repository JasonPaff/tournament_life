import { SessionBuilder } from './components';
import { rootRoute } from '../../providers';
import { Route } from '@tanstack/router';

export const sessionBuilderRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'session-builder',
    component: () => <SessionBuilder />,
});
