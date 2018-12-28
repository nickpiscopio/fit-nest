import { DatePipe } from '@angular/common';

export class DateUtil {
  public static FORMAT_DATE = 'M/d/yyyy';

  public static getDisplayDate(date: number, format: string): string {
    return new DatePipe(DateUtil.getLocale()).transform(DateUtil.getISODate(date), format);
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
