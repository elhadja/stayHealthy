import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InteractionsService } from './interactions.service';
import { Doctor } from './models.service';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class DoctorService {
  private searchResults: Doctor[] = [];
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer '
  });

  constructor(private http: HttpClient, private interactions: InteractionsService) {
    this.interactions.token.subscribe(token => this.headers = this.headers.set('Authorization', token));
  }

  create(data: object): Observable<any> {
    return this.http.post(`${baseUrl}/doctor`, data);
  }

  login(data: object): Observable<any> {
    return this.http.post(`${baseUrl}/doctor/login`, data);
  }

  getDoctorsByLocation(postalCode: string): Observable<any> {
    return this.http.get(`${baseUrl}/doctor?postalCode=${postalCode}`, {headers: this.headers});
  }

  getDoctorsByName(name: string): Observable<any> {
    return this.http.get(`${baseUrl}/doctor?name=${name}`, {headers: this.headers});
  }

  get(id: string): Observable<any> {
    return this.http.get(`${baseUrl}/doctor/${id}`, {headers: this.headers});
  }

  update(id: string, data: object): Observable<any> {
    return this.http.put(`${baseUrl}/doctor/${id}`, data, {headers: this.headers});
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/doctor/${id}`, {headers: this.headers});
  }

  /**
   * update the search result
   * @param results to set
   */
  setSearchResult(results: Doctor[]): void {
    this.searchResults = results;
  }

  /**
   * Return a list of doctors from search search result
   */
  getSearchResult(): Doctor[] {
    return this.searchResults;
  }
}
