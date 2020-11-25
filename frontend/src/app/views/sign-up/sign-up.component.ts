import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private patientService: PatientService) {}
  onSubmit(data: object): void {
    this.patientService.addPatient(data)
      .subscribe(response => {
          alert(response);
          console.log(response);
        },
        error => {
          console.error(error);
        });
  }

  ngOnInit(): void {
  }
}
