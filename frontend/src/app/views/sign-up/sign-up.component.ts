import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import {DoctorService} from '../../services/doctor.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  hide1 = true;
  hide2 = true;
  constructor(private patient: PatientService, private doctor: DoctorService, private router: Router) {}

  onSubmit(data: object, profile: string): void {
    if (profile === 'patient') {
      this.createUser(this.patient, data);
    } else if (profile === 'doctor') {
      this.createUser(this.doctor, data);
    } else {
      console.error('user unspecified from sign-in form!!');
    }
  }

  createUser(user: DoctorService|PatientService, data: object): void {
    user.create(data)
      .subscribe(response => {
          alert(response.message);
          console.log(response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error(error);
          this.router.navigate(['/signup']);
        });
  }

  ngOnInit(): void {
  }
}
