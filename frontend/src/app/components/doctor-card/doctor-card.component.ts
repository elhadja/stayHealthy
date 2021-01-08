import {Component, Input, OnInit} from '@angular/core';
import {InteractionsService} from '../../services/interactions.service';
import {Doctor} from '../../services/models.service';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.css']
})
export class DoctorCardComponent implements OnInit {

  @Input() doctor!: Doctor;

  constructor(public tools: InteractionsService) { }

  ngOnInit(): void {
  }
}
