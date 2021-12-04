const fastify = require('fastify');
const cors = require('fastify-cors');
const serverStatic = require('fastify-static');
const path = require('path');

const userRoutes = require('./routes/user-routes');
const taskRoutes = require('./routes/tasks-routes');

const build = (opts = {}) => {
  const app = fastify(opts);

  app.register(cors, {
    origin: true,
    credentials: true,
  });

  app.register(serverStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/public/',
  });

  // app.register(userRoutes, { prefix: 'users' });
  // app.register(taskRoutes, { prefix: 'tasks' });

  return app;
};

module.exports = { build };