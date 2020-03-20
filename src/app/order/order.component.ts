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

  productForm: FormGroup;
  editedRowIndex: number;
  editedProduct: Product;


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

  editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);

    this.productForm = new FormGroup({
      Quantities: new FormControl(dataItem.Quantities, [
        Validators.required,
        Validators.min(0)
      ]),
      Price: new FormControl(dataItem.Price, [
        Validators.required,
        Validators.min(0)
      ]),
      EtaFrom: new FormControl(dataItem.EtaFrom, [Validators.required]),
      EtaTo: new FormControl(dataItem.EtaTo, [Validators.required]),

      CustomerSku: new FormControl(dataItem.CustomerSku, Validators.required),
      SpecialInstructions: new FormControl(
        dataItem.SpecialInstructions,
        Validators.required
      )
    });

    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.productForm);
  }

  cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  saveHandler({ sender, rowIndex, formGroup }) {
    const product: Product = formGroup.value;
    this.order.products[rowIndex].Quantities = product.Quantities;
    this.order.products[rowIndex].Price = product.Price;
    this.order.products[rowIndex].CustomerSku = product.CustomerSku;
    this.order.products[rowIndex].SpecialInstructions = product.SpecialInstructions;

    sender.closeRow(rowIndex);
    this.orderCalculate();
  }

  removeHandler({ dataItem }) {
    this.order.products = this.order.products.filter(
      prod => prod.id !== dataItem.id
    );
    this.orderCalculate();
  }

  closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.productForm = undefined;
  }

  // ---------------------------------------------------------------------------------------------------------------
  // You have to count totalPares totalCases and total price and set them for order

  orderCalculate() {
    let totalCases = 0;
    let totalPares = 0;
    let price = 0;
    this.order.products.map(prod => (totalPares += prod.sizeRun.totalPairs));
    this.order.products.map(prod => (totalCases += prod.quantities));
    this.order.products.map(prod => (price += prod.quantities * prod.price));

    this.order.totalPares = totalPares;
    this.order.totalCases = totalCases;

    this.order.total = +Number.parseFloat(price.toString()).toFixed(2) ;
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
      this.alertify.error(
        'To create an Order you have to select Billing Address.'
      );
      submit = false;
    }
    if (this.order.products.length === 0) {
      this.alertify.error(
        'To create an Order at least one Product has to be selected!.'
      );
      submit = false;
    }
    if (this.order.salesPerson === undefined) {
      this.alertify.error(
        'To create an Order please select Sale Representative!.'
      );
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
    this.order.salesPerson = null;
    this.curCustomer = new Customer();
    this.curCustomer.addresses = new Array<Address>();
    this.localTotal = '';
  }

  onSalesPersonChanged(code: string) {
    this.code = code;
    this.order.salesPerson = this.salesPersons.find(man => man.code === code);
  }

  // onThumbnail(id: any) {
  //   this.order.products = this.order.products.filter(prod => prod.id !== id);
  //   this.orderCalculate();
  // }
}
