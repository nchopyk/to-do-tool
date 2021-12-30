const TokenService = require('../services/token-service');
const MailService = require('../services/mail-service');
const AuthService = require('../services/auth-service');
const AuthController = require('../controllers/auth-controller');

function initAuthRoutes({ fastify, dbClient }) {
  const tokenService = new TokenService({ fastify, dbClient });
  const mailService = new MailService();
  const authService = new AuthService({ fastify, dbClient, mailService, tokenService });
  const authController = new AuthController(authService);

  return (fastify, opts, done) => {
    fastify.post('/sign-up', authController.signUp);
    fastify.post('/login', {}, authController.login);
    fastify.post('/logout', {}, authController.logout);
    fastify.get('/activate/:link', {}, authController.activate);
    fastify.get('/refresh-tokens/', {}, authController.refreshTokens);

    done();
  };
}

module.exports = initAuthRoutes;
