'use strict';

const fastify = require('fastify');
const cors = require('fastify-cors');

const projectsRouter = require('./src/components/projects/routes');

const build = (opts = { logger: true }) => {
  const app = fastify(opts);

  app.register(cors, {
    origin: true,
    credentials: true,
  });

  app.register(projectsRouter, { prefix: 'projects' });

  return app;
};

module.exports = { build };
