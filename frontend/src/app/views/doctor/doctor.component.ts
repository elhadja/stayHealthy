import { Component, OnInit } from '@angular/core';
import { InteractionsService } from '../../services/interactions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  name = 'Brad';

  private profile: string | undefined;
  constructor(private tools: InteractionsService, private router: Router) {  }

  ngOnInit(): void {
    this.tools.profile.subscribe(profile => this.profile = profile);
    console.log(this.profile);

    if (this.profile !== 'doctor') {
      this.router.navigate(['/']);
      console.log('you don\'t have profile to access to this page');
    }
  }
}
