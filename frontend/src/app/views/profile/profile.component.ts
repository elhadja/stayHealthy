import { Component, OnInit } from '@angular/core';
import {InteractionsService} from '../../services/interactions.service';
import {PatientService} from '../../services/patient.service';
import {DoctorService} from '../../services/doctor.service';
import {Price} from '../../services/models.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {DialogComponent} from '../../components/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';

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
  addressForm!: FormGroup;

  diplomas: string[] = [];
  prices: string[] = [];
  meansOfPayment: string[] = [];

  constructor(private patient: PatientService, private doctor: DoctorService,
              private tools: InteractionsService, private router: Router,
              private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.tools.profile.subscribe(profile => this.profile = profile);
    this.tools.userId.subscribe(userId => this.userId = userId);

    this.addressForm = this.fb.group({
      road: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('[0-9]*'),
        Validators.minLength(5), Validators.maxLength(5)]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    });

    this.updateForm =  this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z]*')]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z]*')]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern('[0-9]*'),
        Validators.minLength(10), Validators.maxLength(10)]],
      password: [''],
      password2: [''],
      address: this.addressForm,
    });
    if (this.profile === 'doctor') {
      this.updateForm.addControl('speciality', new FormControl('',
        [Validators.required, Validators.minLength(3)]));
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
          const speciality = {speciality : response.speciality};
          if (speciality.speciality === undefined) {
            speciality.speciality = '';
          }
          data = Object.assign(data, speciality);
          this.diplomas = response.diplomas;
          this.prices = this.pricesToString(response.prices);
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
      if (dataSubmitted.speciality.length > 2) {
        data = Object.assign(data, {speciality: dataSubmitted.speciality});
      }
      data = Object.assign(data, {diplomas: this.diplomas});
      data = Object.assign(data, {prices: this.stringToPrices(this.prices)});
      data = Object.assign(data, {meansOfPayment: this.meansOfPayment});
      this.updateUser(this.doctor, data);
    } else {
      console.error('user profile unspecified!');
      this.updateFailed = 'profil utilisateur inconnu';
    }
  }

  updateUser(user: DoctorService|PatientService, data: object): void {
    user.update(this.userId, data)
      .subscribe(() => {
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

    // Add our item
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

  stringToPrices(list: string[]): Price[] {
    const prices: Price[] = [];
    for (const item of list) {
      const itemSplit = item.split(':');
      const price: Price = {
        description: itemSplit[0],
        price: Number.parseInt(itemSplit[1], 10),
      };
      prices.push(price);
    }
    return prices;
  }

  pricesToString(list: Price[]): string[] {
    const prices: string[] = [];
    for (const item of list) {
      const price = item.description + ' : ' + item.price + '€';
      prices.push(price);
    }
    return prices;
  }

  deleteAccount(): void{
    const dialogRef = this.dialog.open(DialogComponent,
      {width: '270px', data: 'Etês-vous vraiment sûr de supprimer ce compte?'});
    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          if (this.profile === 'doctor') {
            this.deleteUser(this.doctor);
          } else if (this.profile === 'patient'){
            this.deleteUser(this.patient);
          } else {
            this.tools.openSnackBar('Erreur lors de la suppression! Profil Inconnu');
          }
        }
      });
  }
  deleteUser(user: DoctorService|PatientService): void {
    user.delete(this.userId).subscribe(
      () => {
        this.tools.openSnackBar('Compte supprimé!');
        this.tools.reset();
        this.router.navigate(['/']);
      },
      error => {
        this.tools.openSnackBar('Erreur lors de la suppression!');
        console.log(error);
      }
    );
  }

  getEmailErrMessage(): string {
    return this.updateForm.getError('required', ['email']) ? 'Saisissez votre email' :
      this.updateForm.getError('email', ['email']) ? 'Email invalide' :
        '';
  }

  getNameErrMessage(name: string): string {
    return this.updateForm.getError('required', [name]) ? 'ce champ Obligatoire. ' :
      this.updateForm.getError('minlength', [name]) ? 'la longueur est invalide. ' :
        this.updateForm.getError('pattern', [name]) ? 'un nom est composé de lettres uniquement. ' :
          '';
  }

  getPhoneErrMessage(): string {
    return this.updateForm.getError('required', ['tel']) ? 'saisissez votre numéro de téléphone.' :
      this.updateForm.getError('pattern', ['tel']) ? 'un numéro est composé de chiffres uniquement. ' :
        this.updateForm.getError('minlength', ['tel']) ? 'un numéro est composé de 10 chiffres. ' :
          this.updateForm.getError('maxlength', ['tel']) ? 'un numéro est composé de 10 chiffres. ' :
            '';
  }

  getPasswordErrMessage(): string {
    return this.updateForm.getError('required', ['password']) ? 'Saisissez votre numéro de tél.' :
      this.updateForm.getError('minlength', ['password']) ? '8 caractères au minimum. ' :
        this.updateForm.getError('maxlength', ['password']) ? '32 caractères au maximum. ' :
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

  getSpecialityErrMessage(): string {
    return this.updateForm.hasError('required', ['speciality']) ? 'Champ Obligatoire' :
      this.updateForm.getError('minlength', ['speciality']) ? 'Champ Obligatoire' : '';
  }

  getFieldErrMessage(type: string): string {
    return this.updateForm.hasError('required', [type]) ? 'ce champ Obligatoire' : '';
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
