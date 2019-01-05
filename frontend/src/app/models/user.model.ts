import { UserDatabaseColumns } from '../constants/database-columns/authorization-columns.constant';
import { Encrypt } from '../util/encrypt.util';

export class User {
  private email: string;

  oldEmail: string;
  name: string;
  userGroup: string;

  constructor() {
    this.name = '';
  }

  setFromObject(user: User): void {
    this.email = user.email;
    this.oldEmail = user.oldEmail;
    this.name = user.name;
    this.userGroup = user.userGroup;
  }

  setFromJson(json: any): void {
    this.email = json[UserDatabaseColumns.EMAIL];
    this.name = json[UserDatabaseColumns.NAME];
    this.userGroup = json[UserDatabaseColumns.USER_GROUP];
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
