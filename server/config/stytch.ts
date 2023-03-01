import https from 'https';

const stytch = require('stytch');

const agent = new https.Agent({
    keepAlive: true,
});

export const stytchClient = new stytch.Client({
    project_id: process.env.STYTCH_PROJECT_ID || 'project-test-d08cf405-478e-47a3-ae8a-91b36036d966',
    secret: process.env.STYTCH_SECRET || 'secret-test-_bIUUEgkM9WExVL_BxO-BMpzEIUM_hktqsw=',
    env: stytch.envs.test,
    agent,
});