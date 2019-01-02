import { DatePipe } from '@angular/common';

export class DateUtil {
  public static FORMAT_DATE = 'M/d/yyyy';
  public static MILLIS_24_HOURS = 86399999;

  public static getDisplayDate(date: number, format: string): string {
    return new DatePipe(DateUtil.getLocale()).transform(DateUtil.getISODate(date), format);
  }

  public static getStartOfDayInMillisFromDate(date: number) {
    return this.getMillisFromDate(date);
  }

  public static getEndOfDayInMillisFromDate(date: number) {
    return this.getMillisFromDate(date) + this.MILLIS_24_HOURS;
  }

  public static getMillisFromDate(date: number): number {
    return new Date(date).getTime();
  }

  public static getISODate(date: number): string {
    return new Date(date).toISOString();
  }

  public static getLocale(): string {
    return 'en-US';
  }
}
