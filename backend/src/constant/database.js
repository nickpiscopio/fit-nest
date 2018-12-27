'use strict';

module.exports = {
  HOST: process.env.FIT_NEST_DB_IP || 'localhost',
  PORT: process.env.FIT_NEST_PORT || 26257,
  USER: 'fit_nest_admin_user',
  DATABASE_NAME: 'fit_nest_db'
};


