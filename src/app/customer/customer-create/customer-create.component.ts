import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/_models/customer/Customer';
import { transformData } from 'src/app/utils/util';
import { FormStorageService } from 'src/app/_services/form-storage.service';
import { SalesPerson } from 'src/app/_models/SalesPerson';
import { CustomerFormService } from './customer-form.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit, OnDestroy {
  @ViewChild('modalRef', { static: true }) modalRef: BsModalRef;
  customerForm: FormGroup;
  customerFormSub: Subscription;
  addresses: FormArray;
  customers: Customer[];
  salesPersons: SalesPerson[];


  constructor(
    private customerFormService: CustomerFormService,
    private formStorageService: FormStorageService
  ) {
    this.formStorageService.getCustomers().subscribe(data => {
      this.customers = data;
    });

    this.formStorageService.getSalesPersons().subscribe(data => {
      this.salesPersons = data;
    });

    this.customerFormSub = this.customerFormService.customerForm$.subscribe(
      customer => {
        this.customerForm = customer;
        this.addresses = this.customerForm.get('addresses') as FormArray;
      }
    );
  }

  onFocus(id: string) {
    //document.getElementById(`${id}-asterisk`).style.color = 'transparent';
  }

  ngOnInit() {
    this.addAddress();
  }

  ngOnDestroy() {
    this.customerFormSub.unsubscribe();
  }

  modalClose() {
    this.modalRef.hide();
    this.customerForm.reset();
  }

  addAddress() {
    this.customerFormService.addAddress();
  }

  deleteAddress(index: number) {
    this.customerFormService.deleteAddress(index);
  }

  onSubmit() {
    this.formStorageService.addCustomer(
      transformData(this.customerForm, this.salesPersons)
    );
    this.customerForm.reset();
  }
}
