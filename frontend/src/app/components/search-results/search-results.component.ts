import {Component, OnInit} from '@angular/core';
import {InteractionsService} from '../../services/interactions.service';
import {Coordinate, Doctor} from '../../services/models.service';
import {PatientService} from '../../services/patient.service';

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

  constructor(private patient: PatientService, private tools: InteractionsService) {
    this.tools.doctorListStatusObs.subscribe(status => {
      this.showDoctorList = status;
    });
    this.tools.doctorInfoStatusObs.subscribe(status => {
      this.showDoctorInfo = status;
    });
    this.tools.searchResultsObs.subscribe(results => {
      this.doctors = results;
      if (results.length > 0) {
        this.patient.setCenter(this.tools.getFullAddress(results[0]));
        this.addResultsToMap(results);
      }
    });
  }

  ngOnInit(): void {
  }

  onBack(): void {
    if (this.showDoctorInfo) {
      this.patient.removeMarkers();
      this.tools.showSearchResult();
      if (this.doctors.length > 0) {
        this.patient.setCenter(this.tools.getFullAddress(this.doctors[0]));
        this.addResultsToMap(this.doctors);
      }
    } else if (this.showDoctorList) {
      this.patient.removeMarkers();
      this.tools.showSearchForm();
    }
  }

  getDoctorInfo(doctorInfo: Doctor): void {
    this.doctorInfo = doctorInfo;
    const address = this.tools.getFullAddress(this.doctorInfo);
    this.patient.removeMarkers();
    this.patient.setCenter(address);
    this.patient.addMarker(address);
    this.tools.showDoctorInfo();
  }

   addResultsToMap(results: Doctor[]): void {
    for (const doctor of results) {
      this.patient.addMarker(this.tools.getFullAddress(doctor));
    }
  }
}
