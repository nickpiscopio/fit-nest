import { UserDatabaseColumns } from '../constants/authorization-columns.constant';
import { Encrypt } from '../util/encrypt.util';

export class User {
  name: string;
  oldEmail: string;
  private email: string;

  setConfigurationFromJson(json: any): void {
    this.name = json[UserDatabaseColumns.NAME];
    this.email = json[UserDatabaseColumns.EMAIL];
  }

  setEmail(email: string): void {
    this.oldEmail = this.email;
    this.email = Encrypt.encode(email);
  }

  getEmail(): string {
    return this.hasEmail() ? Encrypt.decode(this.email) : '';
  }

  hasEmail(): boolean {
    return this.email !== undefined && this.email !== null && this.email.trim() !== '';
  }
}
