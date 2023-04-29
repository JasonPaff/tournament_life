import { rootRoute } from '../../providers';
import { Route } from '@tanstack/router';
import { Settings } from './components';

export const settingsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'settings',
    component: () => <Settings />,
});
