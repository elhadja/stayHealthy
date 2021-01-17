import { Component, OnInit } from '@angular/core';
import {InteractionsService} from '../../services/interactions.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  private profile = 'undefined';

  constructor(private tools: InteractionsService, private router: Router) { }

  ngOnInit(): void {
    // Check the user profile to grant access
    this.tools.profile.subscribe(profile => this.profile = profile);
    if (this.profile === 'patient') {
      this.router.navigate(['/patient']);
      return;
    }
    if (this.profile === 'doctor') {
      this.router.navigate(['/doctor']);
      return;
    }
  }

}
