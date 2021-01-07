import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InteractionsService } from './interactions.service';
import { Doctor } from '../views/doctor/doctor';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private headers: HttpHeaders | undefined;

  constructor(private http: HttpClient, private interactions: InteractionsService) {
    this.interactions.token.subscribe(token => token);//this.headers.set('Authorization', token));
  }

  create(data: object): Observable<any> {
    return this.http.post(`${baseUrl}/doctor`, data);
  }

  login(data: object): Observable<any> {
    return this.http.post(`${baseUrl}/doctor/login`, data);
  }

  setAuthorization(newToken: string): void {
    this.headers = new HttpHeaders().set("Authorization", "Bearer "+ newToken);
  }

  get(id: string) : Observable<Doctor>{
    return this.http.get<Doctor>(`${baseUrl}/doctor/${id}`, {headers: this.headers});
  }

  update(id: object, data: object): Observable<any> {
    return this.http.put(`${baseUrl}/doctor/${id}`, data, {headers: this.headers});
  }

  delete(id: object): Observable<any> {
    return this.http.delete(`${baseUrl}/doctor/${id}`, {headers: this.headers});
  }
}
