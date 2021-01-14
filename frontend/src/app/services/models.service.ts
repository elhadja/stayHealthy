export interface Address{
  road: string;
  postalCode: number;
  city: string;
}

export interface City {
  name: string;
  code: string;
}

export interface Doctor {
  _id: string;
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

export interface Coordinate {
  x: number;
  y: number;
}

export interface Slot {
  _id: string;
  date: {
    jj: number,
    mm: number,
    yy: number
  };
  startHour: {
    hh: number,
    mn: number
  };
  doctorId: string;
  patientId: string;
}

export interface AppointmentLight {
  id: string;
  name: string;
  dateHour: string;
  address: string;
}

export const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

export class ModelsService {
  constructor() { }
}
