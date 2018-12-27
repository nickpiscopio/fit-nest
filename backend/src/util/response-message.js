'use strict';

const Log = require('./log');
const log = new Log();

function getSuccessMessage(message) {
  return log.createMessage(message);
}

function getFailedMessage(message) {
  return log.createMessage(message);
}

module.exports = {
  getSuccessMessage: getSuccessMessage,
  getFailedMessage: getFailedMessage,
};
