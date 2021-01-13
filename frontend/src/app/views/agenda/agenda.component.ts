import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../../services/doctor.service';
import {PatientService} from '../../services/patient.service';
import {InteractionsService} from '../../services/interactions.service';
import {Router} from '@angular/router';
import {AppointmentLight, Slot} from '../../services/models.service';
import {AppointmentService} from '../../services/appointment.service';
import {DialogComponent} from '../../components/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  slots: AppointmentLight[] = [];
  private profile = 'undefined';
  private userId = 'undefined';

  constructor(private doctor: DoctorService, private patient: PatientService,
              private appointment: AppointmentService, private dialog: MatDialog,
              public tools: InteractionsService, private router: Router) {

    this.tools.profile.subscribe(profile => this.profile = profile);
    this.tools.userId.subscribe(userId => this.userId = userId);
  }

  ngOnInit(): void {
    // Check the user profile to grant access
    if (this.profile === 'patient') {
      this.appointment.getAllFromPat().subscribe(
        results => this.extractData(results, this.doctor));
    } else if (this.profile === 'doctor') {
      this.appointment.getAllFromDoc().subscribe(
        results => this.extractData(results, this.patient));
    } else {
      this.router.navigate(['/']);
      console.log('unauthorized user cannot access to this page');
    }
  }
  extractData(slots: Slot[], user: DoctorService|PatientService): void{
    for (const slot of slots) {
      let userId = 'undefined';
      if (this.profile === 'patient') {
        userId = slot.doctorId;
      } else if (this.profile === 'doctor') {
        userId = slot.patientId;
      } else {
        return;
      }
      user.get(userId).subscribe(
        userObj => {
          const fullName = this.tools.getFullName(userObj);
          const date = this.tools.displayDateHour(slot);
          const fullAddress = this.tools.getFullAddress(userObj);
          const appointment = {
            id: slot._id,
            name: fullName,
            dateHour: date,
            address: fullAddress
          };
          this.slots.push(appointment);
        }
      );
    }
  }

  cancel(slot: AppointmentLight): void {
    const dialogRef = this.dialog.open(DialogComponent,
      {width: '270px', data: 'Annulez ce Rendez-vous?'});
    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.appointment.update(slot.id).subscribe(
            response => {
              this.tools.openSnackBar('Rendez-vous annulé!');
              this.slots = [];
              this.ngOnInit();
            },
            error => this.tools.openSnackBar('Erreur lors de l\'annulation!')
          );
        }
      });
  }
}
