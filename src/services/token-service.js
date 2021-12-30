class TokenService {
  constructor({ fastify, dbClient }) {
    this.fastify = fastify;
    this.dbClient = dbClient;
  }

  async generateTokens(payload) {
    const accessToken = this.fastify.jwt.sign({ payload }, { expiresIn: '30m' });
    const refreshToken = this.fastify.jwt.sign({ payload }, { expiresIn: '30m' });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveRefreshToken({ userId, refreshToken }) {
    // TODO: add possibility to save several token and after its expiration delete them
    await this.dbQueries.saveUserToken({ userId, refreshToken });
    return refreshToken;
  }

  dbQueries = {
    saveUserToken: async ({ userId, refreshToken }) => this.dbClient('users').where({ id: userId }).update({ refresh_token: refreshToken }),
  };
}

module.exports = TokenService;
