const LOG_PREFIX = '[FIT-NEST]';

export class Log {
  static log(message: string): void {
    console.log(this.getLogPrefix(), message);
  }

  static error(message: string): void {
    console.error(this.getLogPrefix(), message);
  }

  static getLogPrefix(): string {
    return LOG_PREFIX;
  }
}
