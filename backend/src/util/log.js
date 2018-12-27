'use strict';

const LOG_PREFIX = '[Fit_Nest]';

const ANSI_COLOR_NORMAL = '\u001B[0m';
const ANSI_COLOR_WARN = '\u001B[33m';
const ANSI_COLOR_ERROR = '\u001B[31m';

class Log {
  log(message) {
    console.log(ANSI_COLOR_NORMAL, this.createMessage(message));
  }

  warn(message) {
    console.log(ANSI_COLOR_WARN, this.createMessage(message), ANSI_COLOR_NORMAL);
  }

  error(message) {
    console.log(ANSI_COLOR_ERROR, this.createMessage(message), ANSI_COLOR_NORMAL);
  }

  createMessage(message) {
    return LOG_PREFIX + ' ' + message;
  }
}

module.exports = Log;

