import {
  CalendarDateFormatter,
  DateFormatterParams,
  CalendarEvent,
  CalendarEventTitleFormatter
} from 'angular-calendar';
import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class DateFormatterService extends CalendarDateFormatter {
  // any of the methods defined in the parent class can be overridden

  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', locale as string);
  }

  public weekViewHour({ date, locale }: DateFormatterParams): string {
    return this.dayViewHour({ date, locale });
  }
}

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  private locale = 'fr-FR';

  constructor() {
    super();
  }

  month(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'HH:mm', this.locale)}</b> ${
      event.title
    }`;
  }

  week(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'HH:mm', this.locale)}</b> ${
      event.title
    }`;
  }

  day(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'HH:mm', this.locale)}</b> ${
      event.title
    }`;
  }
}
