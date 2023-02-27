import { Route } from '@tanstack/react-router';
import { rootRoute } from '../../RootRoute';
import { SignIn } from '../components';

export const signInRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'signIn',
    component: () => <SignIn />,
});