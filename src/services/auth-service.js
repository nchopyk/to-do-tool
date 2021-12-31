const { toPayloadUserDto, toDefaultUserDto } = require('../dtos/user-dtos');
const uuid = require('uuid');

class AuthService {
  constructor({ fastify, dbClient, mailService, tokenService }) {
    this.fastify = fastify;
    this.dbClient = dbClient;
    this.mailService = mailService;
    this.tokenService = tokenService;
  }

  async signUp({ email, password, username, activationEndpointUrl }) {
    const existingUser = await this.dbQueries.getUserByEmail(email);

    if (existingUser) throw new Error('User with such email already exists');

    const hashPassword = await this.fastify.bcrypt.hash(password);
    const activationLink = uuid.v4();
    const newUserId = await this.dbQueries.insertNewUser({ email, password: hashPassword, username, activationLink });

    const user = await this.dbQueries.getUserById(newUserId);

    await this.mailService.sendActivationMail({ to: email, link: encodeURI(`${activationEndpointUrl}/${activationLink}`) });

    const tokens = await this.tokenService.generateTokens(toPayloadUserDto(user));
    await this.tokenService.saveRefreshToken({ userId: newUserId, refreshToken: tokens.refreshToken });

    return {
      user: toDefaultUserDto(user),
      tokens,
    };
  }

  async login() {}

  async logout() {}

  async activate(activationLink) {
    const user = await this.dbQueries.getUserByActivationLink(activationLink);

    if (!user) throw new Error('Incorrect activation link');

    await this.dbQueries.activateUser(user.id);
  }

  async refreshTokens() {}

  dbQueries = {
    getUserByEmail: async (email) => {
      const [user] = await this.dbClient.select().from('users').where({ email });
      return user;
    },
    getUserById: async (id) => {
      const [user] = await this.dbClient.select().from('users').where({ id });
      return user;
    },
    getUserByActivationLink: async (activationLink) => {
      const [user] = await this.dbClient.select().from('users').where({ activation_link: activationLink });
      return user;
    },
    insertNewUser: async ({ username, email, password, activationLink }) => {
      const [newUserId] = await this.dbClient('users').insert({ username, email, password, activation_link: activationLink });
      return newUserId;
    },
    activateUser: async (userId) => this.dbClient('users').update({ verified: true }).where({ id: userId }),
  };
}

module.exports = AuthService;
