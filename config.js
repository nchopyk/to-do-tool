require('dotenv').config();
module.exports = {
  PORT: process.env.HOST || '5000',
  HOST: process.env.HOST || '0.0.0.0'
};