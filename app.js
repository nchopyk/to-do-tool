'use strict';

const fastify = require('fastify');
const cors = require('fastify-cors');

const projectsRouter = require('./src/components/projects/project-routes');
const tasksRouter = require('./src/components/tasks/task-routes');

const build = (opts = { logger: { prettyPrint: true } }) => {
  const app = fastify(opts);

  app.register(cors, {
    origin: true,
    credentials: true,
  });

  app.register(projectsRouter, { prefix: 'projects' });
  app.register(tasksRouter, { prefix: 'tasks' });

  return app;
};

module.exports = { build };
