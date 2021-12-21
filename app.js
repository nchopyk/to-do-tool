const fastify = require('fastify');
const config = require('./config');
const cors = require('fastify-cors');
const initDbConnection = require('./src/db/mysqlClient');

const userRoutes = require('./routes/user-routes');
const taskRoutes = require('./routes/tasks-routes');

const build = (opts = {}) => {
  const app = fastify(opts);
  const db = initDbConnection();

  app.register(cors, {
    origin: true,
    credentials: true,
  });


  // app.register(userRoutes, { prefix: 'users' });
  // app.register(taskRoutes, { prefix: 'tasks' });

  return app;
};

module.exports = { build };