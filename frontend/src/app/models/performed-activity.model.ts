import { PerformedActivityDatabaseColumns } from '../constants/database-columns/performed-activity-columns.constant';
import { DateUtil } from '../util/date.util';
import { Partner } from './partner.model';

export class PerformedActivity {
  id: number;
  date: number;
  activity: string;
  points: number;
  partners: Partner[];

  constructor(public userEmail: string, public challengeId: number) {
    let now = new Date().getTime();
    this.setDate(now);
    this.partners = [];
  }

  setFromObject(performedActivity: PerformedActivity) {
    this.id = performedActivity.id;
    this.date = performedActivity.date;
    this.userEmail = performedActivity.userEmail;
    this.activity = performedActivity.activity;
    this.challengeId = performedActivity.challengeId;
    this.points = performedActivity.points;
    this.partners = performedActivity.createNewPartners();
  }

  setFromJson(json: any): void {
    this.id = json[PerformedActivityDatabaseColumns.ID];
    this.date = json[PerformedActivityDatabaseColumns.DATE];
    this.userEmail = json[PerformedActivityDatabaseColumns.USER_EMAIL];
    this.activity = json[PerformedActivityDatabaseColumns.ACTIVITY];
    this.challengeId = json[PerformedActivityDatabaseColumns.CHALLENGE_ID];
    this.points = json[PerformedActivityDatabaseColumns.POINTS];
    this.partners = this.getNewPartners(json[PerformedActivityDatabaseColumns.PARTNERS]);
  }

  createNewPartners() {
    return this.getNewPartners(this.partners);
  }

  getNewPartners(partners: any) {
    let newPartners: Partner[] = [];

    for (let i = 0; i < partners.length; i++) {
      let partner = partners[i];
      newPartners.push(new Partner(partner.email, partner.name));
    }

    return newPartners;
  }

  setDate(date: number): void {
    this.date = DateUtil.getStartOfDayInMillisFromDate(date);
  }

  getDateTimeStamp(): string {
    return DateUtil.getISODate(this.date);
  }

  getHumanReadableDate(): string {
    return DateUtil.getDisplayDate(this.date, DateUtil.FORMAT_DATE);
  }
}
