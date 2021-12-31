const { toPayloadUserDto, toDefaultUserDto } = require('../dtos/user-dtos');

class AuthService {
  constructor({ fastify, dbClient, mailService, tokenService }) {
    this.fastify = fastify;
    this.dbClient = dbClient;
    this.mailService = mailService;
    this.tokenService = tokenService;
  }

  async signUp({ email, password, username }) {
    const existingUser = await this.dbQueries.getUserByEmail(email);

    if (existingUser) throw new Error('User with such email already exists');

    const hashPassword = await this.fastify.bcrypt.hash(password);
    const newUserId = await this.dbQueries.insertNewUser({ email, password: hashPassword, username, activationLink: hashPassword });
    const user = await this.dbQueries.getUserById(newUserId);

    await this.mailService.sendActivationMail({ to: email, link: hashPassword });

    const tokens = await this.tokenService.generateTokens(toPayloadUserDto(user));
    await this.tokenService.saveRefreshToken({ userId: newUserId, refreshToken: tokens.refreshToken });

    return {
      user: toDefaultUserDto(user),
      tokens,
    };
  }

  async login() {}

  async logout() {}

  async activate() {}

  async refreshTokens() {}

  dbQueries = {
    getUserByEmail: async (email) => {
      const [user] = this.dbClient.select().from('users').where({ email });
      return user;
    },
    getUserById: async (id) => {
      const [user] = this.dbClient.select().from('users').where({ id });
      return user;
    },
    insertNewUser: async ({ username, email, password }) => {
      const [newUserId] = this.dbClient('users').insert({ username, email, password });
      return newUserId;
    },
  };
}

module.exports = AuthService;
