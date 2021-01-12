import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {InteractionsService} from '../../services/interactions.service';
import {DoctorService} from '../../services/doctor.service';
import {City, Doctor} from '../../services/models.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  speciality = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  name = new FormControl();

  searchFailed = '';

  matchList: City[] = [];
  cities!: Observable<City[]>;

  constructor(private doctor: DoctorService, private tools: InteractionsService, private httpClient: HttpClient) {  }

  ngOnInit(): void {
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
    return city && city.name + ', ' + city.code;
  }

  /**
   * Get a list of cities starting by @name and their postal code
   * @param name of the city
   */
  getCities(name: string): Observable<any>{
    return this.httpClient.get<any>(
      `https://geo.api.gouv.fr/communes?nom=${name}&fields=codesPostaux,centre&boost=population&limit=5`);
  }


  /**
   * get a list of matching cities as the user is typing
   */
  getMatchList(): void {
    this.matchList = [];
    const name: string = this.location.value;
    if (name !== null && name.length > 1) {
      this.getCities(name.toLowerCase()).subscribe(responses => {
        // Keep only the name and postal code from the response
        for (const response of responses) {
          this.matchList.push({name: response.nom, code: response.codesPostaux[0]});
        }
      });
    } else {
      this.matchList = [];
    }
  }

  /**
   * Called function on submission
   */
  onSubmit(): void {
    if ((this.speciality.value !== '' && this.location.value.code) && !this.name.value) {
      this.doctor.getDoctorsByLocation( this.location.value.code).subscribe(
        results => {
          const searchResult: Doctor[] = [];
          for (const result of results){
            if (result.speciality === this.speciality.value) {
              searchResult.push(result);
            }
          }
          this.doctor.setSearchResult(searchResult);
          this.tools.showSearchResult();
        });
    } else if (!(this.speciality.value !== '' || this.location.value.code) && this.name.value) {
      this.doctor.getDoctorsByName(this.name.value).subscribe(
        results => {
          this.doctor.setSearchResult(results);
          this.tools.showSearchResult();
        });
    } else {
      this.searchFailed = 'erreur dans le formulaire! Recherche uniquement par localité ou par nom';
    }
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
