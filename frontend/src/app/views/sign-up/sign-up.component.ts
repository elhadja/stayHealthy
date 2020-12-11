import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import {DoctorService} from '../../services/doctor.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  hide = true;
  constructor(private patient: PatientService, private doctor: DoctorService) {}
  onSubmit(data: object, profile: string): void {
    if (profile === 'patient') {
      this.patient.create(data)
        .subscribe(response => {
            alert(response.message);
            console.log(response);
          },
          error => {
            console.error(error);
          });
    } else if (profile === 'doctor') {
      this.doctor.create(data)
        .subscribe(response => {
            alert(response.message);
            console.log(response);
          },
          error => {
            console.error(error);
          });
    } else {
      console.error('user unspecified from signin form!!');
    }
  }

  ngOnInit(): void {
  }
}
