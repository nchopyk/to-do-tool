const config = require('../../config');

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  signUp = async (request, reply) => {
    const { username, email, password } = request.body;
    const activationEndpointUrl = `${request.protocol}://${request.hostname}${request.url}`.replace('sign-up', 'activate');

    const userDto = await this.authService.signUp({ username, email, password, activationEndpointUrl });
    reply.send(userDto);
  };

  login = async (request, reply) => {};

  logout = async (request, reply) => {};

  activate = async (request, reply) => {
    const { link } = request.params;

    await this.authService.activate(link);
    reply.redirect(config.CLIENT_URL);
  };

  refreshTokens = async (request, reply) => {};
}

module.exports = AuthController;
