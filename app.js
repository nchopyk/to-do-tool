const initFastify = require('fastify');
const config = require('./config');

const initDbConnection = require('./src/db/mysqlClient');
const initAuthRouter = require('./src/routes/auth-router');

const build = (opts = {}) => {
  const fastify = initFastify(opts);
  const dbClient = initDbConnection();

  fastify.register(require('fastify-cors'), {
    origin: true,
    credentials: true,
  });

  fastify.register(require('fastify-bcrypt'), {
    saltWorkFactor: 5,
  });

  fastify.register(require('fastify-jwt'), {
    secret: config.JWT_SECRET_KEY,
  });

  fastify.register(initAuthRouter({ fastify, dbClient }), { prefix: 'auth' });

  return fastify;
};

module.exports = { build };
