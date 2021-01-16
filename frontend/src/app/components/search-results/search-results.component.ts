import {Component, OnInit} from '@angular/core';
import {InteractionsService} from '../../services/interactions.service';
import {Doctor} from '../../services/models.service';
import {DoctorService} from '../../services/doctor.service';
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

  constructor(private patient: PatientService, private doctor: DoctorService, private tools: InteractionsService) {
    this.tools.doctorListStatusObs.subscribe(status => {
      this.showDoctorList = status;
    });
    this.tools.doctorInfoStatusObs.subscribe(status => {
      this.showDoctorInfo = status;
    });
    this.doctors = this.doctor.getSearchResult();
    if (this.doctors.length > 0) {
      this.patient.setCenter(this.tools.getFullAddress(this.doctors[0]), 13, 0.05);
      this.addResultsToMap(this.doctors);
    }
  }

  ngOnInit(): void {
  }

  onBack(): void {
    if (this.showDoctorInfo) {
      this.patient.removeMarkers();
      this.tools.showSearchResult();
      if (this.doctors.length > 0) {
        this.patient.setCenter(this.tools.getFullAddress(this.doctors[0]), 13, 0.05);
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
    this.patient.setCenter(address, 15, 0.01);
    this.patient.addMarker(address);
    this.tools.showDoctorInfo();
  }

   addResultsToMap(results: Doctor[]): void {
    for (const doctor of results) {
      this.patient.addMarker(this.tools.getFullAddress(doctor));
    }
  }
}
