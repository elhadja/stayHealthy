import { Component, OnInit } from '@angular/core';
import {InteractionsService} from '../../services/interactions.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private tools: InteractionsService) { }

  ngOnInit(): void {
    // Check the user profile to grant access
    this.tools.redirectToHomePage();
  }

}
