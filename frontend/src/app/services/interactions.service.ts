import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  private subject = new BehaviorSubject<string>('');
  token = this.subject.asObservable();

  constructor() { }

  setAuthorization(newToken: string): void {
    this.subject.next('Bearer' + newToken);
  }
}
