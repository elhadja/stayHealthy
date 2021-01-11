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
  prices: Array<Price>;
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

export interface Price {
  description: string;
  price: number;
}

export interface ResponseType {
  input: string;
  cities: City[];
}

export interface Coordinate {
  x: number;
  y: number;
}

export class ModelsService {
  constructor() { }
}
