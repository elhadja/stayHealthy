import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  create(data: object): Observable<any> {
    return this.http.post(`${baseUrl}/doctor`, data);
  }

  login(data: object): Observable<any> {
    return this.http.post(`${baseUrl}/doctor/login`, data);
  }

  get(id: object): Observable<any> {
    return this.http.get(`${baseUrl}/doctor/${id}`);
  }

  update(id: object, data: object): Observable<any> {
    return this.http.put(`${baseUrl}/doctor/${id}`, data);
  }

  delete(id: object): Observable<any> {
    return this.http.delete(`${baseUrl}/doctor/${id}`);
  }
}
