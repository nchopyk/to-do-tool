const knex = require('knex');
const knexConfig = require('./knexfile');
const config = require('../../config');

const DEFAULT_OPTIONS = knexConfig[config.NODE_ENV];

function initDbConnection(options = DEFAULT_OPTIONS) {
  console.log('[DB] initializing connection...');
  const db = knex(options);
  checkDbConnection(db);

  return db;
}

function checkDbConnection(dbInstance) {
  dbInstance.raw('SELECT 1')
    .then(() => console.log('[DB] connection established'))
    .catch(err => {
      console.log(err);
      process.exit(1);
    });
}

module.exports = initDbConnection;

