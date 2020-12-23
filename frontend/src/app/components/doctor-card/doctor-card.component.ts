import { Component, OnInit } from '@angular/core';
import {InteractionsService} from '../../services/interactions.service';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.css']
})
export class DoctorCardComponent implements OnInit {

  constructor(private tools: InteractionsService) { }

  ngOnInit(): void {
  }

  getDoctorInfo(): void {
    this.tools.showDoctorInfo();
  }
}
