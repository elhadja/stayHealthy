import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SlotService {
  constructor(private http: HttpClient) { }

  create(data: object): Observable<any> {
    return this.http.post(`${baseUrl}/slot`, data);
  }

  get(id: object): Observable<any> {
    return this.http.get(`${baseUrl}/slot/${id}`);
  }

  getAllFromDoc(doctorId: object): Observable<any> {
    return this.http.get(`${baseUrl}/slots/${doctorId}`);
  }

  update(id: object, data: object): Observable<any> {
    return this.http.put(`${baseUrl}/slot/${id}`, data);
  }

  delete(id: object): Observable<any> {
    return this.http.delete(`${baseUrl}/slot/${id}`);
  }
}
