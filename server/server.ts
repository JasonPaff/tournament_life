import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext } from './config';
import { appRouter } from './routers';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';

const appInsights = require('applicationinsights');
appInsights
    .setup(
        'InstrumentationKey=a27ba2c0-11e8-4c85-9404-7a62bb30e35e;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/'
    )
    .start();

const PORT = process.env.PORT || 5000;

const server = express();

server.use(cors());
server.use(logger('dev', {}));
server.use(express.json());

// Serve the React static files after build
server.use(express.static('../client/dist'));

server.listen(PORT, () => {
    console.log('server started');
});

// API endpoint
server.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

// All unmatched requests will return the React app
server.get('/', (req, res) => {
    res.sendFile(path.resolve('/opt/render/project/src/', 'client', 'dist', 'index.html'));
});