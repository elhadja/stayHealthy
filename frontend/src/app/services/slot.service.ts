import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InteractionsService } from './interactions.service';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SlotService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application:json',
    Authorization: 'Bearer'
  });

  constructor(private http: HttpClient, private interactions: InteractionsService) {
    this.interactions.token.subscribe(token => this.headers.set('Authorization', token));
  }

  create(data: object): Observable<any> {
    return this.http.post(`${baseUrl}/slot`, data, {headers: this.headers});
  }

  get(id: object): Observable<any> {
    return this.http.get(`${baseUrl}/slot/${id}`, {headers: this.headers});
  }

  getAllFromDoc(doctorId: object): Observable<any> {
    return this.http.get(`${baseUrl}/slots/${doctorId}`, {headers: this.headers});
  }

  update(id: object, data: object): Observable<any> {
    return this.http.put(`${baseUrl}/slot/${id}`, data, {headers: this.headers});
  }

  delete(id: object): Observable<any> {
    return this.http.delete(`${baseUrl}/slot/${id}`, {headers: this.headers});
  }
}
