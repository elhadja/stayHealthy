import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {City, ResponseType} from '../views/patient/patient.component';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  // Constants
  PATIENT = 'patient';
  DOCTOR = 'doctor';

  // Observables
  private tokenSubject = new BehaviorSubject<string>('undefined');
  token = this.tokenSubject.asObservable();
  private profileSubject = new BehaviorSubject<string>('undefined');
  profile = this.profileSubject.asObservable();

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) { }

  /**
   * Set authorization token
   * @param newToken the token to set
   */
  setAuthorization(newToken: string): void {
    this.tokenSubject.next('Bearer' + newToken);
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
}
