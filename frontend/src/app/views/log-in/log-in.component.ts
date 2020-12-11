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
      this.loginUser(this.patient, data, profile);
    } else if (profile === 'doctor') {
      this.loginUser(this.doctor, data, profile);
    } else {
      console.error('user unspecified from login form!!');
    }
  }

  loginUser(user: DoctorService|PatientService, data: object, profile: string): void {
    user.login(data)
      .subscribe(response => {
          console.log('connected');
          this.tools.setAuthorization(response.token);
          if (profile === 'doctor') {
            this.router.navigate(['/doctor']);
          } else if (profile === 'patient') {
            this.router.navigate(['/patient']);
          } else {
            this.router.navigate(['/unknown']);
          }
        },
        error => {
          console.error(error);
        });
  }

  ngOnInit(): void {
  }

}
