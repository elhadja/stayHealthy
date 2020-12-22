import { Component, OnInit } from '@angular/core';
import { InteractionsService } from '../../services/interactions.service';
import { Router } from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';


export interface City {
  city: string;
  code: string;
}
export interface ResponseType {
  input: string;
  cities: City[];
}

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})

export class PatientComponent implements OnInit {
  private profile: string | undefined;

  speciality = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  search = new FormControl();

  matchList: City[] = [];
  cities: Observable<City[]> | undefined;

  constructor(private tools: InteractionsService, private router: Router) {  }

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
    console.log(this.profile);
    if (this.profile !== 'patient') {
      this.router.navigate(['/']);
      console.log('unauthorized user cannot access to this page');
    }

    this.initMap();

    // Init autocompletion for location field
    this.cities = this.location.valueChanges
      .pipe(
        startWith(''),
        map(value => {
          this.getMatchList();
          value = this.matchList;
          return value;
        })
      );
  }

  /**
   * display function
   * @param city city to display
   */
  displayFn(city: City): string {
    return city && city.city + ', ' + city.code;
  }

  /**
   * get a list of matching cities as the user is typing
   */
  getMatchList(): void {
    const name: string = this.location.value;
    if (name !== null && name.length > 1) {
      this.tools.getCities(name.toLowerCase()).subscribe(response => {
        this.matchList = response.cities;
      });
    } else {
      this.matchList = [];
    }
  }

  /**
   * Called function on submission
   */
  onSubmit(): void {
    this.tools.openSnackBar(this.speciality.value + ' ' + this.location.value.city);
  }

  /**
   * Error message for speciality field
   */
  getSpecErrMessage(): string {
    return this.speciality.hasError('required') ? 'Précisez la spécialité' : '';
  }

  /**
   * Error message for location field
   */
  getLocationErrMessage(): string {
    return this.location.hasError('required') ? 'Précisez la zone de recherche' : '';
  }
}
