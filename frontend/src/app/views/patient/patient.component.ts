import { Component, OnInit } from '@angular/core';
import { InteractionsService } from '../../services/interactions.service';
import { Router } from '@angular/router';
import {PatientService} from '../../services/patient.service';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})

export class PatientComponent implements OnInit {
  private profile: string | undefined;

  showSearchForm = true;
  showSearchResult = false;

  constructor(private patient: PatientService, private tools: InteractionsService, private router: Router) {
    this.tools.searchFormStatusObs.subscribe(status => {
      this.showSearchForm = status;
    });
    this.tools.searchResultStatusObs.subscribe(status => {
      this.showSearchResult = status;
    });
  }

  ngOnInit(): void {
    // Check the user profile to grant access
    this.tools.profile.subscribe(profile => this.profile = profile);
    if (this.profile !== 'patient') {
      this.router.navigate(['/']);
    }

    this.patient.initMap();

  }

}
