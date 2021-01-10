import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {InteractionsService} from '../../services/interactions.service';
import {DoctorService} from '../../services/doctor.service';
import {City, Doctor} from '../../services/models.service';

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

  constructor(private doctor: DoctorService, private tools: InteractionsService) {  }

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
    if (this.speciality.value !== '' && this.location.value.code) {
      this.doctor.getDoctorsByLocation( this.location.value.code).subscribe(
        results => {
          const searchResult: Doctor[] = [];
          for (const result of results){
            if (result.speciality === this.speciality.value) {
              searchResult.push(result);
            }
          }
          this.tools.setSearchResult(searchResult);
        });
      this.tools.openSnackBar(this.speciality.value + ' ' + this.location.value.code + ' search by location');
      this.tools.showSearchResult();
    } else if (this.name.value) {
      this.doctor.getDoctorsByName( this.name.value).subscribe(
        results => this.tools.setSearchResult(results));
      this.tools.openSnackBar(this.name.value + ' search by name');
      this.tools.showSearchResult();
    } else {
      this.searchFailed = 'erreur dans le formulaire!';
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
