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

  constructor(private patient: PatientService, private doctor: DoctorService,
              private tools: InteractionsService, private router: Router, private fb: FormBuilder) {}

  signupForm =  this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    tel: ['', [Validators.required, Validators.pattern('[0-9]*'),
              Validators.minLength(10), Validators.maxLength(10)]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    road: ['', Validators.required],
    postalCode: ['', Validators.required],
    city: ['', Validators.required],
    profile: ['', Validators.required],
  });


  onSubmit(): void {
    this.signupFailed = '';
    const data = this.signupForm.value;
    const profile = data.profile;
    if (profile === 'patient') {
      this.createUser(this.patient, data);
    } else if (profile === 'doctor') {
      this.createUser(this.doctor, data);
    } else {
      console.error('user unspecified from sign-up form!!');
      this.signupFailed = 'profil non renseigné';
    }
  }

  createUser(user: DoctorService|PatientService, data: object): void {
    user.create(data)
      .subscribe(response => {
          this.tools.openSnackBar('Inscription réussie');
          console.log(response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error(error);
          this.signupFailed = 'Inscription échouée';
        });
  }

  getEmailErrMessage(): string {
    return this.signupForm.getError('required', ['email']) ? 'Saisissez votre email' :
      this.signupForm.getError('email', ['email']) ? 'Email invalide' :
        '';
  }

  getNameErrMessage(name: string): string {
    return this.signupForm.getError('required', [name]) ? 'Champ Obligatoire' :
      this.signupForm.getError('minlength', [name]) ? 'La longueur est invalide' :
        '';
  }

  getPhoneErrMessage(): string {
    return this.signupForm.getError('required', ['tel']) ? 'Saisissez votre numéro de tél.' :
      this.signupForm.getError('pattern', ['tel']) ? 'un numéro est composé de chiffres uniquement' :
      this.signupForm.getError('minlength', ['tel']) ? 'un numéro est composé de 10 chiffres ' :
      this.signupForm.getError('maxlength', ['tel']) ? 'un numéro est composé de 10 chiffres' :
        '';
  }

  getFieldErrMessage(type: string): string {
    return this.signupForm.hasError('required', [type]) ? 'Champ Obligatoire' : '';
  }

  isEqualPwd(): boolean{
    const data = this.signupForm.value;
    if (data.password === data.password2) {
      return true;
    }
    this.signupFailed = 'mot de passe incohérents';
    return false;
  }

  ngOnInit(): void {
  }
}
