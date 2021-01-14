import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { InteractionsService } from '../../services/interactions.service';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import {colors, Doctor} from '../../services/models.service';
import {CustomEventTitleFormatter, DateFormatterService} from '../../services/date-formatter.service';
import { addDays, isSameDay, isSameMonth } from 'date-fns';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarDateFormatter,
  DAYS_OF_WEEK,
  CalendarView,
  CalendarEventTitleFormatter, CalendarEventAction
} from 'angular-calendar';

@Component({
  selector: 'app-doctor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: DateFormatterService,
    },
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
})

export class DoctorComponent implements OnInit {


  private profile = 'undefined';
  private userId = 'undefined';
  doctor!: Doctor;

  hours: number[] = [];
  minutes: number[] = [];

  locale = 'fr-FR';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  CalendarView = CalendarView;

  view: CalendarView = CalendarView.Month;

  viewDate = new Date();

  activeDayIsOpen = true;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        // this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  events: CalendarEvent[] = [
    {
      title: 'Click me',
      color: colors.yellow,
      start: new Date(),
      actions: this.actions
    },
    {
      title: 'Or click me',
      color: colors.red,
      start: new Date(),
      actions: this.actions
    },
    {
      title: 'click here',
      color: colors.blue,
      start: addDays(new Date(), 1),
      actions: this.actions
    },
  ];

  constructor(private doctorService: DoctorService, private tools: InteractionsService,
              private router: Router, private modal: NgbModal) {
    for (let h = 0; h < 24; h++) {
      this.hours.push(h);
    }

    for (let m = 0; m < 4; m++) {
      this.minutes.push(m * 15);
    }
  }

  ngOnInit(): void {
    // Check the user profile to grant access
    this.tools.profile.subscribe(profile => this.profile = profile);
    this.tools.userId.subscribe(userId => this.userId = userId);

    if (this.profile === 'doctor') {
      this.doctorService.get(this.userId).subscribe(
        response => { this.doctor = response; });
    } else {
      this.router.navigate(['/']);
      console.log('you don\'t have profile to access to this page');
    }
  }

  sundayFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Sunday from being selected.
    return day !== 0;
  }

  setView(view: CalendarView): void {
    this.view = view;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
  handleEvent(action: string, event: CalendarEvent): void {
    console.log('Event Occurred ',  action);
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }
}
