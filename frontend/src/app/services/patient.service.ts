import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InteractionsService } from './interactions.service';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer '
  });

  constructor(private interactions: InteractionsService, private http: HttpClient) {
    this.interactions.token.subscribe(token => this.headers = this.headers.set('Authorization', token));
  }

  create(data: object): Observable<any> {
    return this.http.post(`${baseUrl}/patient`, data);
  }

  login(data: object): Observable<any> {
    return this.http.post(`${baseUrl}/patient/login`, data);
  }

  get(id: string): Observable<any> {
    return this.http.get(`${baseUrl}/patient/${id}`, {headers: this.headers});
  }

  update(id: string, data: object): Observable<any> {
    return this.http.put(`${baseUrl}/patient/${id}`, data, {headers: this.headers});
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/patient/${id}`, {headers: this.headers});
  }

}
