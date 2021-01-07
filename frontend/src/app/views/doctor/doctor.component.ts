import { Component, OnInit } from '@angular/core';
import { InteractionsService } from '../../services/interactions.service';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/views/doctor/doctor';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctor: Doctor | undefined;

  private profile: string | undefined;
  constructor(private doctorService: DoctorService, private tools: InteractionsService, private router: Router) {  }

  ngOnInit(): void {
    this.getDoctorByID();
    this.tools.profile.subscribe(profile => this.profile = profile);

    if (this.profile !== 'doctor') {
      this.router.navigate(['/']);
      console.log('you don\'t have profile to access to this page');
    }
  }

  getDoctorByID(): void {
    const id ='5fbcd897ba31ac275cad1e4c'; // get myID ?
    this.doctorService.get(id)
    .subscribe(doctor => this.doctor = doctor);
  }
}
