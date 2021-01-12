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
    'Content-Type': 'application/json',
    Authorization: 'Bearer '
  });

  constructor(private http: HttpClient, private interactions: InteractionsService) {
    this.interactions.token.subscribe(token => this.headers = this.headers.set('Authorization', token));
  }

  create(slotId: string): Observable<any> {
    return this.http.post(`${baseUrl}/appointment/${slotId}`, {}, {headers: this.headers});
  }

  getAllFromPat(patientId: string): Observable<any> {
    return this.http.get(`${baseUrl}/appointment/patient/`, {headers: this.headers});
  }

  getAllFromDoc(doctorId: string): Observable<any> {
    return this.http.get(`${baseUrl}/appointment/doctor/`, {headers: this.headers});
  }

  update(id: string, data: object): Observable<any> {
    return this.http.put(`${baseUrl}/appointment/${id}`, {}, {headers: this.headers});
  }
}
