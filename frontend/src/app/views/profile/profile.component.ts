import { Component, OnInit } from '@angular/core';
import {InteractionsService} from '../../services/interactions.service';
import {PatientService} from '../../services/patient.service';
import {DoctorService} from '../../services/doctor.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  hide1 = true;
  hide2 = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  updateFailed = '';
  profile = 'undefined';
  private userId = 'undefined';
  updateForm!: FormGroup;

  diplomas: string[] = [];
  prices: string[] = [];
  meansOfPayment: string[] = [];

  constructor(private patient: PatientService, private doctor: DoctorService,
              private tools: InteractionsService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.tools.profile.subscribe(profile => this.profile = profile);
    this.tools.userId.subscribe(userId => this.userId = userId);

    this.updateForm =  this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern('[0-9]*'),
        Validators.minLength(10), Validators.maxLength(10)]],
      password: [''],
      password2: [''],
      address:  this.fb.group({
        road: ['', Validators.required],
        postalCode: ['', Validators.required],
        city: ['', Validators.required],
      }),
    });
    if (this.profile === 'doctor') {
      this.updateForm.addControl('speciality', new FormControl('', Validators.required));
    }

    // Check the user profile to grant access
    if (this.profile === 'patient') {
      this.fillForm(this.patient);
    } else if (this.profile === 'doctor') {
      this.fillForm(this.doctor);
    } else {
      this.router.navigate(['/']);
      console.log('unauthorized user cannot access to this page');
    }
  }

  fillForm(user: DoctorService|PatientService): void {
    user.get(this.userId).subscribe(
      response => {
        let data = {
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          tel: response.tel,
          password: '',
          password2: '',
          address: {
            road: response.address.road,
            city: response.address.city,
            postalCode: response.address.postalCode,
          },
        };
        if (this.profile === 'doctor') {
          data = Object.assign(data, {speciality: response.speciality});
          this.diplomas = response.diplomas;
          this.meansOfPayment = response.meansOfPayment;
        }
        // fill the form with the user informations
        this.updateForm.setValue(data);
      }
    );
  }

  onSubmit(): void {
    this.updateFailed = '';
    const dataSubmitted = this.updateForm.value;

    // remove unwanted fields
    let data = {
      firstName: dataSubmitted.firstName,
      lastName: dataSubmitted.lastName,
      email: dataSubmitted.email,
      tel: dataSubmitted.tel,
      address: {
        road: dataSubmitted.address.road,
        city: dataSubmitted.address.city,
        postalCode: dataSubmitted.address.postalCode,
      },
    };
    // add password field if the user want to set a new one
    if (dataSubmitted.password !== '') {
      data = Object.assign(data, {password: dataSubmitted.password});
    }
    // Persist the data
    if (this.profile === 'patient') {
      this.updateUser(this.patient, data);
    } else if (this.profile === 'doctor') {
      data = Object.assign(data, {speciality: dataSubmitted.speciality});
      data = Object.assign(data, {diplomas: this.diplomas});
      // data = Object.assign(data, {prices: this.prices});
      data = Object.assign(data, {meansOfPayment: this.meansOfPayment});
      this.updateUser(this.doctor, data);
    } else {
      console.error('user profile unspecified!');
      this.updateFailed = 'profil utilisateur inconnu';
    }
  }

  updateUser(user: DoctorService|PatientService, data: object): void {
    user.update(this.userId, data)
      .subscribe(response => {
          this.tools.openSnackBar('Modification prise en compte');
          this.router.navigate(['/']);
        },
        error => {
          console.error(error);
          this.updateFailed = 'Modification échouée';
        });
  }

  add(event: MatChipInputEvent, list: string[]): void {
    const input = event.input;
    const value = event.value;

    // Add our diploma
    if ((value || '').trim()) {
      list.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(item: string, list: string[]): void {
    const index = list.indexOf(item);

    if (index >= 0) {
      list.splice(index, 1);
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
