import { CreateTemplate, TemplateBuilder } from './components';
import { rootRoute } from '../../providers';
import { Route } from '@tanstack/router';

export const templateBuilderRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'template-builder',
    component: () => <TemplateBuilder />,
});

export const createTemplateRoute = new Route({
    getParentRoute: () => templateBuilderRoute,
    path: 'create',
    component: () => <CreateTemplate />,
});
