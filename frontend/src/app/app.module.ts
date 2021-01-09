import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DoctorComponent } from './views/doctor/doctor.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { LogInComponent } from './views/log-in/log-in.component';
import { NavComponent } from './components/nav/nav.component';
import { PatientComponent } from './views/patient/patient.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { DoctorCardComponent } from './components/doctor-card/doctor-card.component';
import { DoctorInfoComponent } from './components/doctor-info/doctor-info.component';
import { ProfileComponent } from './views/profile/profile.component';

import { AvatarModule } from 'ngx-avatar';
import { MonthCalendarModule } from 'simple-angular-calendar';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SignUpComponent,
    LogInComponent,
    PatientComponent,
    DoctorComponent,
    PageNotFoundComponent,
    HomepageComponent,
    SearchFormComponent,
    SearchResultsComponent,
    DoctorCardComponent,
    DoctorInfoComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatChipsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AvatarModule,
    MonthCalendarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
