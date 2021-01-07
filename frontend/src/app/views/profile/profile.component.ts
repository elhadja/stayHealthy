import { Component, OnInit } from '@angular/core';
import {InteractionsService} from '../../services/interactions.service';
import {PatientService} from '../../services/patient.service';
import {DoctorService} from '../../services/doctor.service';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  hide1 = true;
  hide2 = true;
  updateFailed = '';
  private profile = 'undefined';
  private userId = 'undefined';

  constructor(private patient: PatientService, private doctor: DoctorService,
              private tools: InteractionsService, private router: Router, private fb: FormBuilder) {}

  updateForm =  this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    tel: ['', [Validators.required, Validators.pattern('[0-9]*'),
      Validators.minLength(10), Validators.maxLength(10)]],
    password: [''],
    password2: [''],
    road: ['', Validators.required],
    postalCode: ['', Validators.required],
    city: ['', Validators.required],
  });

  ngOnInit(): void {
    // Check the user profile to grant access
    this.tools.profile.subscribe(profile => this.profile = profile);
    this.tools.userId.subscribe(userId => this.userId = userId);
    if (this.profile === 'patient') {
      this.patient.get(this.userId).subscribe(
        response => {
          const data = {
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            tel: response.tel,
            password: '',
            password2: '',
            road: response.road,
            city: response.city,
            postalCode: response.postalCode,
          };
          this.updateForm.setValue(data);
        }
      );
    } else {
      this.router.navigate(['/']);
      console.log('unauthorized user cannot access to this page');
    }
  }

  onSubmit(): void {
    this.updateFailed = '';
    const data = this.updateForm.value;
    console.log('submitted data : ');
    console.log(data);
    if (this.profile === 'patient') {
      this.patient.update(this.userId, data)
        .subscribe(response => {
            this.tools.openSnackBar('Modification prise en compte');
            // console.log(response);
            this.router.navigate(['/patient']);
          },
          error => {
            console.error(error);
            this.updateFailed = 'Modification échouée';
          });
    } else if (this.profile === 'doctor') {
      this.doctor.update(this.userId, data)
        .subscribe(response => {
            this.tools.openSnackBar('Modification prise en compte');
            console.log(response);
            this.router.navigate(['/doctor']);
          },
          error => {
            console.error(error);
            this.updateFailed = 'Modification échouée';
          });
    } else {
      console.error('user profile unspecified!');
      this.updateFailed = 'profil utilisateur inconnu';
    }
  }

  getEmailErrMessage(): string {
    return this.updateForm.getError('required', ['email']) ? 'Saisissez votre email' :
      this.updateForm.getError('email', ['email']) ? 'Email invalide' :
        '';
  }

  getNameErrMessage(name: string): string {
    return this.updateForm.getError('required', [name]) ? 'Champ Obligatoire' :
      this.updateForm.getError('minlength', [name]) ? 'La longueur est invalide' :
        '';
  }

  getPhoneErrMessage(): string {
    return this.updateForm.getError('required', ['tel']) ? 'Saisissez votre numéro de tél.' :
      this.updateForm.getError('pattern', ['tel']) ? 'un numéro est composé de chiffres uniquement' :
        this.updateForm.getError('minlength', ['tel']) ? 'un numéro est composé de 10 chiffres ' :
          this.updateForm.getError('maxlength', ['tel']) ? 'un numéro est composé de 10 chiffres' :
            '';
  }

  getFieldErrMessage(type: string): string {
    return this.updateForm.hasError('required', [type]) ? 'Champ Obligatoire' : '';
  }

  isEqualPwd(): boolean{
    const data = this.updateForm.value;
    if (data.password === data.password2) {
      return true;
    }
    this.updateFailed = 'mot de passe incohérents';
    return false;
  }

}
