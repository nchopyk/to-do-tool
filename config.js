require('dotenv').config();
module.exports = {
  NODE_ENV: process.env.NODE_ENV, //development, staging, production
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  DB_CONNECTION_PARAMS: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};
