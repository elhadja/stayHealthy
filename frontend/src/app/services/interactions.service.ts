import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  PATIENT = 'patient';
  DOCTOR = 'doctor';
  private tokenSubject = new BehaviorSubject<string>('undefined');
  token = this.tokenSubject.asObservable();
  private profileSubject = new BehaviorSubject<string>('undefined');
  profile = this.profileSubject.asObservable();

  constructor(private snackBar: MatSnackBar) { }

  setAuthorization(newToken: string): void {
    this.tokenSubject.next('Bearer' + newToken);
  }

  setProfile(newProfile: string): void {
    this.profileSubject.next(newProfile);
  }

  reset(): void {
    this.setAuthorization('undefined');
    this.setProfile('undefined');
  }

  isDoctorConnected(): boolean {
    if (this.profileSubject.value === this.DOCTOR) {
      return true;
    }
    return false;
  }

  isPatientConnected(): boolean {
    if (this.profileSubject.value === this.PATIENT) {
      return true;
    }
    return false;
  }

  openSnackBar(message: string): void{
    this.snackBar.open(message, '', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
}
