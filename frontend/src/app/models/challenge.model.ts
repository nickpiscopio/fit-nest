import { ChallengeDatabaseColumns } from '../constants/challenge-columns.constant';
import { DateUtil } from '../util/date.util';

export class Challenge {
  id: number;
  dateStart: number;
  dateEnd: number;
  name: string;
  activities: String[];

  constructor() {
    this.dateStart = new Date().getTime();
    this.dateEnd = new Date().getTime();
  }

  setConfigurationFromJson(json: any): void {
    this.id = json[ChallengeDatabaseColumns.ID];
    this.dateStart = json[ChallengeDatabaseColumns.DATE_START];
    this.dateEnd = json[ChallengeDatabaseColumns.DATE_END];
    this.name = json[ChallengeDatabaseColumns.NAME];
    this.activities = json[ChallengeDatabaseColumns.ACTIVITIES]
  }

  getStartDate() {
    return DateUtil.getDisplayDate(this.dateStart, DateUtil.FORMAT_DATE);
  }

  getEndDate() {
    return DateUtil.getDisplayDate(this.dateEnd, DateUtil.FORMAT_DATE);
  }
}
