import { Component, OnInit } from '@angular/core';
import { InteractionsService } from '../../services/interactions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  private authorization: string | null | undefined;
  constructor(private interactions: InteractionsService, private router: Router) {  }

  ngOnInit(): void {
    this.interactions.token.subscribe(token => this.authorization = token);

    if (this.authorization === 'Bearer' || this.authorization === null || this.authorization === undefined) {
      this.router.navigate(['/']);
      console.log('you don\'t have authorization to access to this page');
    }
  }
}
