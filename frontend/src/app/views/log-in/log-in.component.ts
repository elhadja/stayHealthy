import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { PatientService } from '../../services/patient.service';
import { InteractionsService } from '../../services/interactions.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  private profile = 'undefined';

  loginFailed = '';
  loginForm =  this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    profile: ['', Validators.required],
  });

  constructor(private tools: InteractionsService, private patient: PatientService,
              private doctor: DoctorService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // Check the user profile to grant access
    this.tools.redirectToHomePage();
  }

  onSubmit(): void {
    this.loginFailed = '';
    const data = this.loginForm.value;
    const profile = data.profile;
    if (profile === this.tools.DOCTOR) {
      this.loginUser(this.doctor, data, profile);
    } else if (profile === this.tools.PATIENT) {
      this.loginUser(this.patient, data, profile);
    } else {
      this.loginFailed = 'undefined profile';
    }
  }

  getEmailErrMessage(): string {
    return this.loginForm.getError('required', ['email']) ? 'Saisissez votre email' :
        this.loginForm.getError('email', ['email']) ? 'Email invalide' :
          '';
  }

  getPasswordErrMessage(): string {
      return this.loginForm.hasError('required', ['password']) ?
                                    'Saisissez votre mot de passe' : '';
  }

  getProfileErrMessage(): string {
      return this.loginForm.hasError('required', ['profile']) ? 'Mentionnez votre profil' : '';
  }

  loginUser(user: DoctorService|PatientService, data: object, profile: string): void {
    user.login(data)
      .subscribe(response => {
          this.tools.setAuthorization(response.token);
          this.tools.setUserId(response.id);
          this.tools.setProfile(profile);
          this.tools.redirectToHomePage();
        },
        () => {
          this.loginFailed = 'mot de passe ou email incorrect';
        });
  }
}
