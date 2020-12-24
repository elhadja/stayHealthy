import {Component, Input, OnInit} from '@angular/core';
import {Doctor} from '../../services/models.service';
import {InteractionsService} from '../../services/interactions.service';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.css']
})
export class DoctorInfoComponent implements OnInit {

  @Input() doctor!: Doctor;

  constructor(public tools: InteractionsService) { }

  ngOnInit(): void {
  }

}
