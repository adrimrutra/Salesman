import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { Customer } from 'src/app/_models/customer/Customer';
import { CustomerForm } from './customer-form';
import { Address } from 'src/app/_models/customer/Address';
import { AddressForm } from 'src/app/forms/address/address-form';


@Injectable({
  providedIn: 'root'
})
export class CustomerFormService {
  private customerForm: BehaviorSubject<
    FormGroup | undefined
  > = new BehaviorSubject(this.fb.group(new CustomerForm(new Customer())));
  customerForm$: Observable<FormGroup> = this.customerForm.asObservable();

  constructor(private fb: FormBuilder) {}

  addAddress() {
    const currentCustomer = this.customerForm.getValue();
    const currentAddresses = currentCustomer.get('addresses') as FormArray;

    currentAddresses.push(this.fb.group(new AddressForm(new Address())));

    this.customerForm.next(currentCustomer);
  }

  deleteAddress(i: number) {
    const currentCustomer = this.customerForm.getValue();
    const currentAddresses = currentCustomer.get('addresses') as FormArray;

    currentAddresses.removeAt(i);

    this.customerForm.next(currentCustomer);
  }
}
