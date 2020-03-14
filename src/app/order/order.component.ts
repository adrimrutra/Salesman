import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { FormStorageService } from '../_services/form-storage.service';
import { Customer } from '../_models/customer/Customer';
import { SalesPerson } from '../_models/SalesPerson';
import { Order } from '../_models/Order';
import { Product } from '../_models/Product';
import { Address } from '../_models/customer/Address';
import { transformOrderData } from '../utils/util';
import {
  getOrderOption,
  getOrderTypeOption,
  getOrderTermsOption
} from '../commons/common';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  customers: Array<Customer>;
  curCustomer: Customer;
  salesPersons: Array<SalesPerson>;
  order: Order;
  code: string;
  orderTermsOption: Array<string>;
  orderOption: Array<string>;
  orderTypeOption: Array<string>;
  localTotal: any;
  isNewCustomer = false;

  bsConfig: any;

  constructor(
    private formStorageService: FormStorageService,
    private formBuilder: FormBuilder,
    private alertify: AlertifyService
  ) {
    this.resetForm();
    this.orderTermsOption = getOrderTermsOption();
    this.orderOption = getOrderOption();
    this.orderTypeOption = getOrderTypeOption();

    this.bsConfig = {
      dateInputFormat: 'YYYY-MM-DD',
      isAnimated: true,
      adaptivePosition: true
    };


  }

  ngOnInit() {
    this.formStorageService.getCustomers().subscribe(customers => {
      this.customers = customers;
    });

    this.formStorageService.getSalesPersons().subscribe(data => {
      this.salesPersons = data;
    });

    this.orderForm = this.formBuilder.group({
      orderTaken: new FormControl('', Validators.required),
      orderNumber: new FormControl('', Validators.required),
      dateSold: new FormControl('', Validators.required),
      shipVia: new FormControl('', Validators.required),
      customerPo: new FormControl('', Validators.required),
      terms: new FormControl('', Validators.required),
      dept: new FormControl('', Validators.required),
      orderType: new FormControl('', Validators.required),
      shipEarly: new FormControl(false),
      orderComments: new FormControl('')
    });
  }

  onSelectedProducts(products: Array<Product>) {
    this.order.products = products;
    this.orderCalculate();
  }

  // ---------------------------------------------------------------------------------------------------------------
    // You have to count totalPares totalCases and total price and set them for order

  orderCalculate() {
    let count = 0;
    this.order.products.map(prod => (count += prod.quantities));

    this.order.totalPares = count;
    this.order.totalCases = count;
    this.order.total = count * 5;
  }

  onSelectedCustomer(customer: Customer) {
    this.curCustomer = customer;
    if (this.customers !== null) {
      this.order.companyName = this.curCustomer.companyName;
      this.order.dba = this.curCustomer.dba;
      this.order.billingAddress = this.curCustomer.addresses.find(
        address => address.billing
      );
      this.order.sippingAddress = this.curCustomer.addresses.find(
        address => !address.billing
      );
    }
  }

  onChangeSippingAddress(index) {
    this.order.sippingAddress = this.curCustomer.addresses[index];
  }

  onShowTotal(event) {
    if (event.target.checked) {
      this.localTotal = this.order.total;
    } else {
      this.localTotal = '';
    }
  }


  onSubmit() {

    let submit = true;
    if (this.order.billingAddress.street1 === undefined) {
      this.alertify.error('To create an Order you have to select Billing Address.');
      submit = false;
    }
    if (this.order.products.length === 0) {
      this.alertify.error('To create an Order at least one Product has to be selected!.');
      submit = false;
    }
    if (this.order.salesPerson === undefined) {
      this.alertify.error('To create an Order please select Sale Representative!.');
      submit = false;
    }

    if (submit) {
      this.formStorageService.addOrder(
        transformOrderData(this.orderForm, this.order)
      );
      this.orderForm.reset();
      this.resetForm();
      this.alertify.success('Order was successfully created!.');
    }
  }

  resetForm() {
    this.order = new Order();
    this.order.products = new Array<Product>();
    this.order.billingAddress = new Address();
    this.order.sippingAddress = new Address();
    this.curCustomer = new Customer();
    this.curCustomer.addresses = new Array<Address>();
   }


  onSalesPersonChanged(code: string) {
    this.code = code;
    this.order.salesPerson = this.salesPersons.find(man => man.code === code);
  }

  onThumbnail(id: any) {
    this.order.products = this.order.products.filter(prod => prod.id !== id);
    this.orderCalculate();
  }
}
