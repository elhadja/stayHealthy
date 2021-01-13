import { Component, OnInit } from '@angular/core';
import { InteractionsService } from '../../services/interactions.service';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import {Doctor} from '../../services/models.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  private profile = 'undefined';
  private userId = 'undefined';

  constructor(private doctorService: DoctorService, private tools: InteractionsService, private router: Router) {  }
  doctor!: Doctor;

  ngOnInit(): void {
    // Check the user profile to grant access
    this.tools.profile.subscribe(profile => this.profile = profile);
    this.tools.userId.subscribe(userId => this.userId = userId);

    if (this.profile === 'doctor') {
      this.doctorService.get(this.userId).subscribe(
        response => { this.doctor = response; });
    } else {
      this.router.navigate(['/']);
      console.log('you don\'t have profile to access to this page');
    }
  }
}
