import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { InteractionsService } from '../../services/interactions.service';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import {PatientService} from '../../services/patient.service';
import {SlotService} from '../../services/slot.service';
import {colors, Doctor, Slot} from '../../services/models.service';
import {addMinutes, isSameDay, isSameMonth} from 'date-fns';
import {CustomEventTitleFormatter, DateFormatterService} from '../../services/date-formatter.service';
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

  events: CalendarEvent[] = [];

  slots: Slot[] = [];

  constructor(private doctorService: DoctorService, private patientService: PatientService,
              private slotService: SlotService, private tools: InteractionsService,
              private router: Router) {
    // Init hours and minutes values for the form
    for (let h = 8; h < 20; h++) {
      this.hours.push(h);
    }

    for (let m = 0; m < 2; m++) {
      this.minutes.push(m * 30);
    }
  }

  ngOnInit(): void {
    // Check the user profile to grant access
    this.tools.profile.subscribe(profile => this.profile = profile);
    this.tools.userId.subscribe(userId => this.userId = userId);

    if (this.profile === 'doctor') {
      this.doctorService.get(this.userId).subscribe(
        response => this.doctor = response);

      // Get all slots and put them in the calendar
      this.slotService.getAllFromDoc(this.userId).subscribe(
        results => {
          for (const result of results) {
            this.slots.push(result);
            this.addSlotInCalendar(result);
          }
        }
      );
    } else {
      this.router.navigate(['/']);
      console.log('you don\'t have profile to access to this page');
    }
  }

  addSlotInCalendar(slot: Slot): void {
    let customTitle = 'libre';
    let customColor = colors.green;
    const customActions: CalendarEventAction[] = [
        {
          label: '<i class="fas fa-fw fa-trash-alt"></i>',
          a11yLabel: 'Delete',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            // this.events = this.events.filter((iEvent) => iEvent !== event);
            this.handleEvent('Deleted', event);
          }
        }
      ];

    const date = new Date();
    // adjust shift in month value (0 == Jan, 1 == Feb, 2 == Mar, ...)
    if (slot.date.mm > 0) {
      date.setFullYear(slot.date.yy, slot.date.mm - 1, slot.date.jj);
    } else {
      date.setFullYear(slot.date.yy, slot.date.mm, slot.date.jj);
    }
    date.setHours(slot.startHour.hh, slot.startHour.mn, 0);

    // customize appointment event
    if (slot.patientId !== undefined) {
      customTitle = 'réservé';
      // this.patientService.get(slot.patientId).toPromise().then(
      //   user => {
      //     customTitle = this.tools.getFullName(user);
      //   }
      // );
      customColor = colors.red;
      customActions.push({
        label: '<i class="fas fa-fw fa-pencil-alt"></i>',
        a11yLabel: 'Edit',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.handleEvent('Edited', event);
        },
      });
    }

    // Create the event and add it to the list
    const customEvent =
        {
          title: customTitle,
          color: customColor,
          start: date,
          end: addMinutes(date, 30),
          actions: customActions
        };
    this.events.push(customEvent);
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
}
