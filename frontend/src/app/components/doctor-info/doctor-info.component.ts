import {Component, Input, OnInit} from '@angular/core';
import {Doctor, Slot} from '../../services/models.service';
import {AppointmentService} from '../../services/appointment.service';
import {InteractionsService} from '../../services/interactions.service';
import {PatientService} from '../../services/patient.service';
import {SlotService} from '../../services/slot.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.css']
})
export class DoctorInfoComponent implements OnInit {

  @Input() doctor!: Doctor;
  slots: Slot[] = [];

  constructor(private appointment: AppointmentService, private slotService: SlotService,
              private patient: PatientService,
              private dialog: MatDialog, public tools: InteractionsService) { }

  ngOnInit(): void {
    this.slotService.getAllFromDoc(this.doctor._id).subscribe(
      results => {
        for (const result of results) {
          // Keep only unbooked slots
          if (!result.patientId) {
            this.slots.push(result);
          }
        }
      }
    );
  }

  book(slot: Slot): void {
    const dialogRef = this.dialog.open(DialogComponent,
      {width: '270px', data: 'Réservez ce créneau?'});
    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.appointment.create(slot._id).subscribe(
            response => {
              this.tools.openSnackBar('Créneau réservez!');
              this.patient.removeMarkers();
              this.tools.showSearchForm();
            },
            error => this.tools.openSnackBar('Erreur lors de la réservation!')
          );
        }
      });
  }
}
