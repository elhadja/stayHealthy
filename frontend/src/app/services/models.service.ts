export interface Address{
  road: string;
  postalCode: number;
  city: string;
}

export interface City {
  city: string;
  code: string;
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  address: Address;
  speciality: string;
  meansOfPayment: Array<string>;
  diplomas: Array<string>;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  address: Address;
}

export interface ResponseType {
  input: string;
  cities: City[];
}

export class ModelsService {
  constructor() { }
}
