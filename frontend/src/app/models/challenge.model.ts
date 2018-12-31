import { ChallengeDatabaseColumns } from '../constants/challenge-columns.constant';
import { DateUtil } from '../util/date.util';

export class Challenge {
  id: number;
  dateStart: number;
  dateEnd: number;
  name: string;
  activities: String[];

  constructor() {
    this.name = '';
    this.dateStart = new Date().getTime();
    this.dateEnd = new Date().getTime();
  }

  setFromObject(challenge: Challenge) {
    this.id = challenge.id;
    this.dateStart = challenge.dateStart;
    this.dateEnd = challenge.dateEnd;
    this.name = challenge.name;
    this.activities = challenge.activities;
  }

  setFromJson(json: any): void {
    this.id = json[ChallengeDatabaseColumns.ID];
    this.dateStart = Number(json[ChallengeDatabaseColumns.DATE_START]);
    this.dateEnd = Number(json[ChallengeDatabaseColumns.DATE_END]);
    this.name = json[ChallengeDatabaseColumns.NAME];
    this.activities = json[ChallengeDatabaseColumns.ACTIVITIES]
  }

  setStartDate(date: number): void {
    this.dateStart = DateUtil.getMillisFromDate(date);
  }

  setEndDate(date: number): void {
    this.dateEnd = DateUtil.getMillisFromDate(date);
  }

  getStartDate(): string {
    return DateUtil.getISODate(this.dateStart);
  }

  getEndDate(): string {
    return DateUtil.getISODate(this.dateEnd);
  }
}
