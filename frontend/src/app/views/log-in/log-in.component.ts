import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { InteractionsService } from '../../services/interactions.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  constructor(private tools: InteractionsService, private patient: PatientService, private doctor: DoctorService, private router: Router) {}
  onSubmit(data: object, profile: string): void {
    if (profile === 'patient') {
      this.patient.login(data)
        .subscribe(response => {
            console.log('connected');
            this.tools.setAuthorization(response.token);
            this.router.navigate(['/patient']);
          },
          error => {
            console.error(error);
          });
    } else if (profile === 'doctor') {
      this.doctor.login(data)
        .subscribe(response => {
            console.log('connected');
            this.tools.setAuthorization(response.token);
            this.router.navigate(['/doctor']);
          },
          error => {
            console.error(error);
          });
    } else {
      console.error('user unspecified from login form!!');
    }
  }

  ngOnInit(): void {
  }

}
