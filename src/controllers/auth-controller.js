class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  signUp = async (request, reply) => {
    const { username, email, password } = request.body;

    const userDto = await this.authService.signUp({ username, email, password });
    return reply.send(userDto);
  };

  login = async (request, reply) => {};

  logout = async (request, reply) => {};

  activate = async (request, reply) => {};

  refreshTokens = async (request, reply) => {};
}

module.exports = AuthController;
