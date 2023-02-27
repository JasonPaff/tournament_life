import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
    errorFormat: 'pretty',
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'stdout',
            level: 'error',
        },
        {
            emit: 'stdout',
            level: 'info',
        },
        {
            emit: 'stdout',
            level: 'warn',
        },
    ],
});

// * Query logging.
prisma.$on('query', (e) => {
    // console.log('Query: ' + e.query);
    // console.log('Params: ' + e.params);
    // console.log('Duration: ' + e.duration + 'ms');
});