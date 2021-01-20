import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import {DoctorService} from '../../services/doctor.service';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {InteractionsService} from '../../services/interactions.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  hide1 = true;
  hide2 = true;
  signupFailed = '';

  addressForm = this.fb.group({
       road: ['', Validators.required],
       postalCode: ['', [Validators.required, Validators.pattern('[0-9]*'),
         Validators.minLength(5), Validators.maxLength(5)]],
       city: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
     });

  signupForm =  this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z ]*')]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z ]*')]],
    email: ['', [Validators.required, Validators.email]],
    tel: ['', [Validators.required, Validators.pattern('[0-9]*'),
              Validators.minLength(10), Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
    password2: ['', Validators.required],
    address: this.addressForm,
    profile: ['', Validators.required],
  });

  constructor(private patient: PatientService, private doctor: DoctorService,
              private tools: InteractionsService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    // Check the user profile to grant access
    this.tools.redirectToHomePage();
  }

  onSubmit(): void {
    this.signupFailed = '';
    const data = this.signupForm.value;
    const profile = data.profile;
    if (profile === 'patient') {
      this.createUser(this.patient, data);
    } else if (profile === 'doctor') {
      this.createUser(this.doctor, data);
    } else {
      this.signupFailed = 'profil non renseigné';
    }
  }

  createUser(user: DoctorService|PatientService, data: object): void {
    user.create(data)
      .subscribe(() => {
          this.tools.openSnackBar('Inscription réussie');
          this.router.navigate(['/login']);
        },
        () => {
          this.signupFailed = 'Inscription échouée';
        });
  }

  getEmailErrMessage(): string {
    return this.signupForm.getError('required', ['email']) ? 'Saisissez votre email' :
      this.signupForm.getError('email', ['email']) ? 'Email invalide' :
        '';
  }

  getNameErrMessage(name: string): string {
    return this.signupForm.getError('required', [name]) ? 'ce champ Obligatoire. ' :
      this.signupForm.getError('minlength', [name]) ? 'la longueur est invalide. ' :
        this.signupForm.getError('pattern', [name]) ? 'un nom est composé de lettres uniquement. ' :
        '';
  }

  getPhoneErrMessage(): string {
    return this.signupForm.getError('required', ['tel']) ? 'saisissez votre numéro de téléphone.' :
      this.signupForm.getError('pattern', ['tel']) ? 'un numéro est composé de chiffres uniquement. ' :
      this.signupForm.getError('minlength', ['tel']) ? 'un numéro est composé de 10 chiffres. ' :
      this.signupForm.getError('maxlength', ['tel']) ? 'un numéro est composé de 10 chiffres. ' :
        '';
  }

  getPasswordErrMessage(): string {
    return this.signupForm.getError('required', ['password']) ? 'Saisissez votre mot de passe.' :
      this.signupForm.getError('minlength', ['password']) ? '8 caractères au minimum. ' :
      this.signupForm.getError('maxlength', ['password']) ? '32 caractères au maximum. ' :
        '';
  }

  getPostalCodeErrMessage(): string {
    return this.addressForm.getError('required', ['postalCode']) ? 'Saisissez votre code postal.' :
      this.addressForm.getError('pattern', ['postalCode']) ? 'ce champ est composé de chiffres uniquement' :
        this.addressForm.getError('minlength', ['postalCode']) ? 'ce champ est composé de 5 chiffres. ' :
          this.addressForm.getError('maxlength', ['postalCode']) ? 'ce champ est composé de 5 chiffres.' :
            '';
  }

  getCityErrMessage(): string {
    return this.addressForm.getError('required', ['city']) ? 'Saisissez votre code postal.' :
      this.addressForm.getError('pattern', ['city']) ? 'une ville est composé de lettres uniquement. ' :
        '';
  }

  getRoadErrMessage(): string {
    return this.addressForm.hasError('required', ['road']) ? 'ce champ Obligatoire. ' : '';
  }

  getFieldErrMessage(type: string): string {
    return this.signupForm.hasError('required', [type]) ? 'ce champ Obligatoire. ' : '';
  }

  isEqualPwd(): boolean{
    const data = this.signupForm.value;
    if (data.password === data.password2) {
      return true;
    }
    this.signupFailed = 'mot de passe incohérents';
    return false;
  }
}
