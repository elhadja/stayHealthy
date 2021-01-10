import { Component, OnInit } from '@angular/core';
import { InteractionsService } from '../../services/interactions.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})

export class PatientComponent implements OnInit {
  private profile: string | undefined;

  showSearchForm = false;
  showSearchResult = false;

  constructor(private tools: InteractionsService, private router: Router) {
    this.tools.searchFormStatusObs.subscribe(status => {
      this.showSearchForm = status;
    });
    this.tools.searchResultStatusObs.subscribe(status => {
      this.showSearchResult = status;
    });
  }

  /**
   * Show a map in map id selector
   */
  private initMap(): void {
    const center = [48.8641, 2.333]; // Paris 1er Arr Coordinates.
    const zoom = 12; // adjust map's zoom

    // Setting Up the Map
    // @ts-ignore
    const maps = L.map('map').setView(center, zoom);
    // @ts-ignore
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; ' +
        '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(maps);

    // Put Marker on the Map
    // const marker = L.marker(center);
    // marker.addTo(map);
  }

  ngOnInit(): void {
    // Check the user profile to grant access
    this.tools.profile.subscribe(profile => this.profile = profile);
    if (this.profile !== 'patient') {
      this.router.navigate(['/']);
      console.log('unauthorized user cannot access to this page');
    }

    this.initMap();

  }

}
