import https from 'https';

const stytch = require('stytch');

const agent = new https.Agent({
    keepAlive: true,
});

export const stytchClient = new stytch.Client({
    project_id: process.env.STYTCH_PROJECT_ID || '',
    secret: process.env.STYTCH_SECRET || '',
    env: process.env.STYTCH_PROJECT_ENV === 'live' ? stytch.envs.live : stytch.envs.test,
    agent,
});