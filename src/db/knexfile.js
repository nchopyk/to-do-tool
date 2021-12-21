const config = require('../../config');

module.exports = {
  development: {
    client: 'mysql',
    connection: config.DB_CONNECTION_PARAMS,
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'mysql',
    connection: config.DB_CONNECTION_PARAMS,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: config.DB_CONNECTION_PARAMS,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
