import { Component, OnInit } from '@angular/core';
import { InteractionsService } from '../../services/interactions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  private profile: string | undefined;

  constructor(private tools: InteractionsService, private router: Router) {  }

  private initMap(): void {
    const center = [48.8641, 2.333]; // Paris 1er Arr Coord.
    const zoom = 12; // adjust map's zoom

    // Setting Up the Map
    // @ts-ignore
    const map = L.map('map').setView(center, zoom);
    // @ts-ignore
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; ' +
        '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Put Marker on the Map
    // const marker = L.marker(center);
    // marker.addTo(map);
  }

  ngOnInit(): void {
    this.tools.profile.subscribe(profile => this.profile = profile);
    console.log(this.profile);
    if (this.profile !== 'patient') {
      this.router.navigate(['/']);
      console.log('you don\'t have profile to access to this page');
    }
    this.initMap();
  }

  onSubmit(value: any): void {
    console.log(value);
  }
}
