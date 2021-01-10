import {Component, Input, OnInit} from '@angular/core';
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

  doctors!: Doctor[];
  doctorInfo!: Doctor;

  constructor(private tools: InteractionsService) {
    this.tools.doctorListStatusObs.subscribe(status => {
      this.showDoctorList = status;
    });
    this.tools.doctorInfoStatusObs.subscribe(status => {
      this.showDoctorInfo = status;
    });
    this.tools.searchResultsObs.subscribe(results => {
      this.doctors = results;
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

  getDoctorInfo(doctorInfo: Doctor): void {
    this.doctorInfo = doctorInfo;
    this.tools.showDoctorInfo();
  }
}
