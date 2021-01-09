import { Component, OnInit } from '@angular/core';
import {InteractionsService} from '../../services/interactions.service';
import {Doctor} from '../../services/models.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  showDoctorList = false;
  showDoctorInfo = false;

  doctor = {
    id: '1',
    address: {
      road: '1 avenue collegno',
      postalCode: 33400,
      city: 'Talence'
    },
    diplomas: ['Diplôme en Diététique', 'Diplôme en Psychologie', 'Diplôme en Pédiatrie'],
    email: 'test@email.com',
    firstName: 'Carl',
    lastName: 'Lewis',
    prices: [{description: 'Consultation', price: 25}],
    meansOfPayment: ['CB', 'Espèces', 'Carte Vitale'],
    speciality: 'Pédiatre',
    tel: '0605797979',
  };

  doctorInfo!: Doctor;

  constructor(private tools: InteractionsService) {
    this.tools.doctorListStatusObs.subscribe(status => {
      this.showDoctorList = status;
    });
    this.tools.doctorInfoStatusObs.subscribe(status => {
      this.showDoctorInfo = status;
    });
  }

  ngOnInit(): void {
  }

  onBack(): void {
    if (this.showDoctorInfo) {
      this.tools.showSearchResult();
    } else if (this.showDoctorList) {
      this.tools.showSearchForm();
    }
  }

  getDoctorInfo(doctorInfo: object): void {
    this.doctorInfo = (doctorInfo as Doctor);
    this.tools.showDoctorInfo();
  }
}
