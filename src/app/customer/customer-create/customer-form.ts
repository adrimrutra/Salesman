import { FormControl, FormArray, Validators } from '@angular/forms';
import { Customer } from 'src/app/_models/customer/Customer';
import { Observable } from 'rxjs';

export class CustomerForm {
  companyName = new FormControl('', Validators.required);
  customerNumber = new FormControl('', Validators.required);
  dba = new FormControl('', Validators.required);
  vatNumber = new FormControl('', Validators.required);
  website = new FormControl('', Validators.required, this.webValidator);
  email = new FormControl('', Validators.required, this.emailValidator);
  phoneCell = new FormControl('', [Validators.required, Validators.pattern('^(\\+)(?:[0-9] ?){5,13}[0-9]$')]);
  phoneLandline = new FormControl('', [Validators.required, Validators.pattern('^(\\+)(?:[0-9] ?){5,13}[0-9]$')]);
  salesperson1 = new FormControl('', Validators.required);
  salesperson2 = new FormControl('', Validators.required);
  notes = new FormControl('');
  contactFirstName = new FormControl('', Validators.required);
  contactLastName = new FormControl('', Validators.required);
  contactEmail = new FormControl('', Validators.required, this.emailValidator);
  contactPhoneCell = new FormControl('', [Validators.required, Validators.pattern('^(\\+)(?:[0-9] ?){5,13}[0-9]$')]);
  contactPhoneLandline = new FormControl('', [Validators.required, Validators.pattern('^(\\+)(?:[0-9] ?){5,13}[0-9]$')]);
  contactFax = new FormControl('', Validators.pattern('^(\\+)(?:[0-9] ?){5,13}[0-9]$'));
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

  emailValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      // tslint:disable-next-line: max-line-length
      const isValid = /^(([a-z0-9!#$%&\'*\+\/=\?\^_\`\{\|\}~\\}]+)|([a-z0-9!#$%&\'*\+\/=\?\^_\`\{\|\}~\\}]+\.[a-z0-9!#$%&\'*\+\/=\?\^_\`\{\|\}~\\}]+))+@[^\.^\-]([a-z]+|((([a-z0-9!#$%&\'*\+\/=\?\^_\`\{\|\}~\\}\-]+)[^\.^\-](\.[a-z]+)))+)+\.[a-z]{2,4}$/.test(control.value);
      if (isValid) {
        resolve(null);
      } else {
        resolve({emailValidator: true});
      }
    });
    return promise;
  }

  webValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      // tslint:disable-next-line: max-line-length
      const isValid = /^(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?$/.test(control.value);
      if (isValid) {
        resolve(null);
      } else {
        resolve({webValidator: true});
      }
    });
    return promise;
  }
}
