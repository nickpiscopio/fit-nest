// https://stackoverflow.com/questions/9205496/how-to-make-connection-to-postgres-via-node-js
const pgp = require('pg-promise')();

const database = require('../constant/database');
const Log = require('../util/log');
const log = new Log();

class Database {
  constructor() {
    this.databaseConnection = null;
  }

  execute(query, callback) {
    this.executeQuery(query, callback);
  }

  executeQuery(query, callback) {
    const self = this;

    self.connect();

    this.databaseConnection.query(query)
      .then(data => {
        self.disconnect();

        callback(false, data);
      })
      .catch(error => {
        log.error(error);

        self.disconnect();

        callback(true, error);
      });
  }

  connect() {
    if (!this.isDatabaseIsConnected()) {
      // TODO: Add Certificates to make cockroach secure.
      // TODO: https://www.cockroachlabs.com/docs/stable/build-a-nodejs-app-with-cockroachdb.html
      let config = {
        host: database.HOST,
        port: database.PORT,
        database: database.DATABASE_NAME,
        user: database.USER
      };

      this.databaseConnection = pgp(config);
    }
  }

  disconnect() {
    this.databaseConnection = pgp.end();
    this.databaseConnection = null;
  }

  isDatabaseIsConnected() {
    return this.databaseConnection !== undefined && this.databaseConnection !== null;
  }
}

module.exports = Database;
