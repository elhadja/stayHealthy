import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {Doctor, Patient, ResponseType} from '../services/models.service';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  // Constants
  PATIENT = 'patient';
  DOCTOR = 'doctor';

  // user Observables
  private tokenSubject = new BehaviorSubject<string>('undefined');
  token = this.tokenSubject.asObservable();
  private profileSubject = new BehaviorSubject<string>('undefined');
  profile = this.profileSubject.asObservable();
  private userIdSubject = new BehaviorSubject<string>('undefined');
  userId = this.userIdSubject.asObservable();

  // search Observables
  private searchFormStatus = new BehaviorSubject<boolean>(true);
  searchFormStatusObs = this.searchFormStatus.asObservable();
  private searchResultStatus =  new BehaviorSubject<boolean>(false);
  searchResultStatusObs = this.searchResultStatus.asObservable();
  private doctorListStatus = new BehaviorSubject<boolean>(true);
  doctorListStatusObs = this.doctorListStatus.asObservable();
  private doctorInfoStatus = new BehaviorSubject<boolean>(true);
  doctorInfoStatusObs = this.doctorInfoStatus.asObservable();

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) { }

  /**
   * Set authorization token
   * @param newToken the token to set
   */
  setAuthorization(newToken: string): void {
    this.tokenSubject.next('Bearer ' + newToken);
  }

  /**
   * Set authorization token
   * @param newToken the token to set
   */
  setUserId(id: string): void {
    this.userIdSubject.next(id);
  }

  /**
   * Set the user profile
   * @param newProfile the user profile to set
   */
  setProfile(newProfile: string): void {
    this.profileSubject.next(newProfile);
  }

  /**
   * Clear token and user profile
   */
  reset(): void {
    this.setAuthorization('undefined');
    this.setUserId('undefined');
    this.setProfile('undefined');
  }

  /**
   * return true if the user connected has a doctor profile
   */
  isDoctorConnected(): boolean {
    return this.profileSubject.value === this.DOCTOR;
  }

  /**
   * return true if the user connected has a patient profile
   */
  isPatientConnected(): boolean {
    return this.profileSubject.value === this.PATIENT;
  }

  /**
   * Show a snackBar on the screen
   * @param message to print in the SnackBar
   */
  openSnackBar(message: string): void{
    this.snackBar.open(message, '', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

  /**
   * Get a list of cities starting by @name and their postal code
   * @param name of the city
   */
  getCities(name: string): Observable<ResponseType>{
    return this.httpClient.get<ResponseType>(
      `https://vicopo.selfbuild.fr/cherche/${name}?format=callback`);
  }

  /**
   * Show search form and hide (search result & doctor info)
   */
  showSearchForm(): void {
    this.searchFormStatus.next(true);
    this.searchResultStatus.next(false);
    this.doctorListStatus.next(false);
    this.doctorInfoStatus.next(false);
  }

  /**
   * Show search result and hide (search form & doctor info)
   */
  showSearchResult(): void {
    this.searchFormStatus.next(false);
    this.searchResultStatus.next(true);
    this.doctorListStatus.next(true);
    this.doctorInfoStatus.next(false);
  }

  /**
   * Show doctor info and hide (search form & search result)
   */
  showDoctorInfo(): void {
    this.searchFormStatus.next(false);
    this.searchResultStatus.next(true);
    this.doctorListStatus.next(false);
    this.doctorInfoStatus.next(true);
  }

  getFullName(user: Doctor| Patient): string {
    return user.firstName + ' ' + user.lastName;
  }

  getFullAddress(user: Doctor| Patient): string {
    const address = user.address;
    return address?.road + ', ' + address?.postalCode + ', ' + address?.city;
  }
}
