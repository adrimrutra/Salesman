import { FormControl, FormArray, Validators } from '@angular/forms';
import { Customer } from 'src/app/_models/customer/Customer';


export class CustomerForm {
  companyName = new FormControl('', Validators.required);
  customerNumber = new FormControl('', Validators.required);
  dba = new FormControl('', Validators.required);
  vatNumber = new FormControl('', Validators.required);
  website = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  phoneCell = new FormControl('', [Validators.required, Validators.pattern('((\\+91-?)|0)?[0-9]{10}$')]);
  phoneLandline = new FormControl('', [Validators.required, Validators.pattern('((\\+91-?)|0)?[0-9]{10}$')]);
  salesperson1 = new FormControl('');
  salesperson2 = new FormControl('');
  notes = new FormControl('');

  contactFirstName = new FormControl('', Validators.required);
  contactLastName = new FormControl('', Validators.required);
  contactEmail = new FormControl('', [Validators.required, Validators.email]);
  contactPhoneCell = new FormControl('', [Validators.required, Validators.pattern('((\\+91-?)|0)?[0-9]{10}$')]);
  contactPhoneLandline = new FormControl('', [Validators.required, Validators.pattern('((\\+91-?)|0)?[0-9]{10}$')]);
  contactFax = new FormControl('', Validators.pattern('((\\+91-?)|0)?[0-9]{10}$'));
  contactIsResidence = new FormControl(false);
  addresses = new FormArray([]);

  constructor(customer: Customer) {
    if (customer.companyName) {
      this.companyName.setValue(customer.companyName);
    }
    if (customer.dba) {
      this.dba.setValue(customer.dba);
    }
    if (customer.vatNumber) {
      this.vatNumber.setValue(customer.vatNumber);
    }
    if (customer.website) {
      this.website.setValue(customer.website);
    }
    if (customer.email) {
      this.email.setValue(customer.email);
    }
    if (customer.phoneCell) {
      this.phoneCell.setValue(customer.phoneCell);
    }
    if (customer.phoneLandline) {
      this.phoneLandline.setValue(customer.phoneLandline);
    }
    if (customer.notes) {
      this.notes.setValue(customer.notes);
    }
    if (customer.addresses) {
    this.addresses.setValue(customer.addresses);
    }
  }
}
