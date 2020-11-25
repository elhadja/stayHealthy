import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private http: HttpClient) { }

  create(data: object): Observable<any> {
    return this.http.post(`${baseUrl}/appointment`, data);
  }

  getAllFromPat(patientId: object): Observable<any> {
    return this.http.get(`${baseUrl}/appointment/patient/${patientId}`);
  }

  getAllFromDoc(doctorId: object): Observable<any> {
    return this.http.get(`${baseUrl}/appointment/doctor/${doctorId}`);
  }

  update(id: object, data: object): Observable<any> {
    return this.http.put(`${baseUrl}/appointment/${id}`, data);
  }

  delete(id: object): Observable<any> {
    return this.http.delete(`${baseUrl}/appointment/${id}`);
  }
}
