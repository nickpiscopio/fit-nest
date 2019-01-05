import { Encrypt } from '../util/encrypt.util';

export class Partner {
  constructor(public email: string, public name: string) { }

  getHumanReadableEmail(): string {
    return Encrypt.decode(this.email);
  }
}
