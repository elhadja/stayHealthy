import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InteractionsService } from './interactions.service';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application:json',
    Authorization: 'Bearer'
  });

  constructor(private http: HttpClient, private interactions: InteractionsService) {
    this.interactions.token.subscribe(token => this.headers.set('Authorization', token));
  }

  create(data: object): Observable<any> {
    return this.http.post(`${baseUrl}/appointment`, data);
  }

  getAllFromPat(patientId: object): Observable<any> {
    return this.http.get(`${baseUrl}/appointment/patient/${patientId}`, {headers: this.headers});
  }

  getAllFromDoc(doctorId: object): Observable<any> {
    return this.http.get(`${baseUrl}/appointment/doctor/${doctorId}`, {headers: this.headers});
  }

  update(id: object, data: object): Observable<any> {
    return this.http.put(`${baseUrl}/appointment/${id}`, data, {headers: this.headers});
  }

  delete(id: object): Observable<any> {
    return this.http.delete(`${baseUrl}/appointment/${id}`, {headers: this.headers});
  }
}
