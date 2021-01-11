import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InteractionsService } from './interactions.service';
import {Address, Coordinate} from './models.service';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer '
  });

  private map = null;
  private markers: object[] = [];

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

  /** Over this line Map functions */

  initMap(): void {
    const center = [48.8641, 2.333]; // Paris 1er Arr Coordinates.
    const zoom = 12; // adjust map's zoom
    // @ts-ignore
    this.map = L.map('map').setView(center, zoom);
    // @ts-ignore
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; ' +
        '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

  }

  setCenter(address: string): void {
    const position: Coordinate = {x: 0, y: 0};
    this.getLocation(address).subscribe(
      response => {
        position.x = response[0].lat;
        position.y = response[0].lon;

        // @ts-ignore
        this.map.panTo(new L.LatLng(position.x, position.y));
      });
  }

  addMarker(address: string): void {
    const position: Coordinate = {x: 0, y: 0};
    this.getLocation(address).subscribe(
      response => {
        position.x = response[0].lat;
        position.y = response[0].lon;
        // @ts-ignore
        const marker = L.marker([position.x, position.y]);
        marker.addTo(this.map);
        this.markers.push(marker);
      });
  }

  getLocation(address: string): Observable<any> {
    const url = 'https://nominatim.openstreetmap.org/search';
    return this.http.get(`${url}/?q=${address}&format=json`);
  }

  removeMarkers(): void {
    for (const marker of this.markers) {
      // @ts-ignore
      this.map.removeLayer(marker);
    }
  }
}
