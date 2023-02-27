import { gameFormatRouter } from './gameFormats';
import { templatesRouter } from './templates';
import { gameTypeRouter } from './gameTypes';
import { venueRouter } from './venues';
import { userRouter } from './users';
import { router } from '../config';

export const appRouter = router({
    gameFormat: gameFormatRouter,
    gameType: gameTypeRouter,
    template: templatesRouter,
    user: userRouter,
    venue: venueRouter,
});

export type AppRouter = typeof appRouter;