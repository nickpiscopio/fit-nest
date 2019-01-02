import { ChallengeDatabaseColumns } from '../constants/challenge-columns.constant';
import { DateUtil } from '../util/date.util';

export class Challenge {
  id: number;
  dateStart: number;
  dateEnd: number;
  name: string;
  activities: string[];

  constructor() {
    this.name = '';
    let now = new Date().getTime();
    this.setStartDate(now);
    this.setEndDate(now);
    this.activities = [];
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
    this.dateStart = DateUtil.getStartOfDayInMillisFromDate(date);
  }

  setEndDate(date: number): void {
    this.dateEnd = DateUtil.getEndOfDayInMillisFromDate(date);
  }

  getStartDateTimeStamp(): string {
    return DateUtil.getISODate(this.dateStart);
  }

  getEndDateTimeStamp(): string {
    return DateUtil.getISODate(this.dateEnd);
  }

  getHumanReadableStartDate(): string {
    return DateUtil.getDisplayDate(this.dateStart, DateUtil.FORMAT_DATE);
  }

  getHumanReadableEndDate(): string {
    return DateUtil.getDisplayDate(this.dateEnd, DateUtil.FORMAT_DATE);
  }

  isActive(): boolean {
    let now = new Date().getTime();
    return now > this.dateStart && now < this.dateEnd;
  }
}
