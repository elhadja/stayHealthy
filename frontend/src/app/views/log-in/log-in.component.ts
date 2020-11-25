import { Component, OnInit } from '@angular/core';
import {PatientService} from '../../services/patient.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private patientService: PatientService) {}
  onSubmit(data: object): void {
    this.patientService.loginPatient(data)
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
