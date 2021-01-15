import {Component, Input, OnInit} from '@angular/core';
import {colors, Doctor, Slot} from '../../services/models.service';
import {AppointmentService} from '../../services/appointment.service';
import {InteractionsService} from '../../services/interactions.service';
import {PatientService} from '../../services/patient.service';
import {SlotService} from '../../services/slot.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {CustomEventTitleFormatter, DateFormatterService} from '../../services/date-formatter.service';
import {
  CalendarDateFormatter,
  CalendarView,
  CalendarEvent,
  CalendarEventTitleFormatter,
  DAYS_OF_WEEK
} from 'angular-calendar';
import {addMinutes, isAfter, isValid} from 'date-fns';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: DateFormatterService,
    },
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ]
})
export class DoctorInfoComponent implements OnInit {

  @Input() doctor!: Doctor;

  locale = 'fr-FR';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  view: CalendarView = CalendarView.Week;
  viewDate = new Date();

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  slots: Slot[] = [];

  constructor(private appointment: AppointmentService, private slotService: SlotService,
              private patient: PatientService, private dialog: MatDialog,
              public tools: InteractionsService, private router: Router) {  }

  ngOnInit(): void {
    this.slotService.getAllFromDoc(this.doctor._id).subscribe(
      results => {
        for (const result of results) {
          // Keep only unbooked slots
          if (!result.patientId) {
            this.slots.push(result);
            this.addSlotInCalendar(result);
          }
        }
        this.refresh.next();
      }
    );
  }

  addSlotInCalendar(slot: Slot): void {
    // Extract and setup the date
    const date = new Date();
    date.setFullYear(slot.date.yy, slot.date.mm, slot.date.jj);
    date.setHours(slot.startHour.hh, slot.startHour.mn, 0);
    // Ignore dates in paste
    if (!isValid(date) || !isAfter(date, this.viewDate)) {
      return;
    }

    // Create the event and add it to the list
    const customEvent =
      {
        title: '',
        color: colors.green,
        start: date,
        end: addMinutes(date, 30),
        actions: [],
        meta: {id: slot._id}
      };
    this.events.push(customEvent);
  }

  book({event}: { event: CalendarEvent }): void {
    const dialogRef = this.dialog.open(DialogComponent,
      {width: '270px', data: 'Réservez ce créneau?'});
    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.appointment.create(event.meta.id).subscribe(
            () => {
              this.tools.openSnackBar('Créneau réservez!');
              this.patient.removeMarkers();
              this.tools.showSearchForm();
              this.router.navigate(['/agenda']);
            },
            error => this.tools.openSnackBar('Erreur lors de la réservation!')
          );
        }
      });
  }
}
