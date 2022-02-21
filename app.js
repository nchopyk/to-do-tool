const fastify = require('fastify');
const config = require('./config');
const cors = require('fastify-cors');
const initDbConnection = require('./src/modules/db/mysqlClient');

const userRoutes = require('./src/users/user-routes');
const taskRoutes = require('./src/tasks/tasks-routes');

const build = (opts = {}) => {
  const app = fastify(opts);

  app.register(cors, {
    origin: true,
    credentials: true,
  });

  // app.register(userRoutes, { prefix: 'users' });
  // app.register(taskRoutes, { prefix: 'tasks' });

  return app;
};

module.exports = { build };
