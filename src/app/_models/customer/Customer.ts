import { SalesPerson } from '../SalesPerson';
import { Address } from './Address';

export class Customer {
  id?: number;
  companyName: string;
  dba: string;
  vatNumber: string;
  website: string;
  email: string;
  phoneCell: string;
  phoneLandline: string;
  salesperson1: SalesPerson;
  salesperson2: SalesPerson;
  notes: string;
  addresses: Address[];

  constructor(
    id?: number,
    companyName?: string,
    dba?: string,
    vatNumber?: string,
    website?: string,
    email?: string,
    phoneCell?: string,
    phoneLandline?: string,
    salesperson1?: SalesPerson,
    salesperson2?: SalesPerson,
    notes?: string,
    addresses?: Address[]
  ) {
    this.id = id;
    this.companyName = companyName;
    this.dba = dba;
    this.vatNumber = vatNumber;
    this.website = website;
    this.email = email;
    this.phoneCell = phoneCell;
    this.phoneLandline = phoneLandline;
    this.salesperson1 = salesperson1;
    this.salesperson2 = salesperson2;
    this.notes = notes;
    this.addresses = addresses;
  }
}
