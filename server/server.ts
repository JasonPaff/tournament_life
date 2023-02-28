import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext } from './config';
import { appRouter } from './routers';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';

const PORT = process.env.PORT || 5000;

const server = express();

server.use(cors());
server.use(logger('dev', {}));
server.use(express.json());

// Serve the React static files after build
server.use(express.static('../client/dist'));

server.listen(PORT, () => {});

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
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});