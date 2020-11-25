import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private http: HttpClient) { }

  addPatient(data: object): Observable<any> {
    return this.http.post(`${baseUrl}/patient`, data);
  }

  loginPatient(data: object): Observable<any> {
    return this.http.post(`${baseUrl}/patient/login`, data);
  }
}
