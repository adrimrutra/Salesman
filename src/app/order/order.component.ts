import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  ViewContainerRef
} from '@angular/core';
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

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @ViewChild('showTotal', { static: false }) showTotal: ElementRef;
  // @ViewChildren('sales', { read: ElementRef }) sales: QueryList<ViewContainerRef>;
  @ViewChildren('sales', { read: ElementRef }) sales: QueryList<ElementRef>;
 
  orderForm: FormGroup;
  curCustomer: Customer;
  salesPersons: Array<SalesPerson>;
  order: Order;
  orderTermsOption: Array<string>;
  orderOption: Array<string>;
  orderTypeOption: Array<string>;
  localTotal: any;
  totalCases: any;
  totalPairs: any;
  total: any;
  bsConfig: any;

  productForm: FormGroup;
  editedRowIndex: number;
  editedProduct: Product;
  isCustomer = false;

  constructor(
    private formStorageService: FormStorageService,
    private formBuilder: FormBuilder
  ) {

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
    this.formStorageService.getSalesPersons().subscribe(data => {
      this.salesPersons = data;
    });

    this.orderForm = this.formBuilder.group({
      isCustomer: new FormControl(false),
      salesPerson: new FormControl(false),
      showCode: new FormControl('', Validators.required),
      orderTaken: new FormControl('', Validators.required),
      orderNumber: new FormControl('', Validators.required),
      dateSold: new FormControl('', Validators.required),
      shipVia: new FormControl('', Validators.required),
      customerPo: new FormControl('', Validators.required),
      terms: new FormControl('', Validators.required),
      dept: new FormControl('', Validators.required),
      orderType: new FormControl('', Validators.required),
      shipEarly: new FormControl(false),
      orderComments: new FormControl(''),
      isProduct: new FormControl(false)
    });
    this.resetForm();
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

  orderCalculate() {
    if (this.order.products.length > 0) {
      let cases = 0;
      let pairs = 0;
      let price = 0;
      this.order.products.map(prod => (pairs += prod.sizeRun.totalPairs));
      this.order.products.map(prod => (cases += prod.quantities));
      this.order.products.map(prod => (price += prod.quantities * prod.price));

      this.order.totalPairs = pairs;
      this.order.totalCases = cases;
      this.order.total = +Number.parseFloat(price.toString()).toFixed(2);

      this.totalCases = cases;
      this.totalPairs = pairs;
      this.total = Number.parseFloat(price.toString()).toFixed(2);

      this.orderForm.patchValue({
        isProduct: true
      });

      if (this.showTotal.nativeElement.checked) {
        this.localTotal = Number.parseFloat(price.toString()).toFixed(2);
      }

    } else {
      this.orderForm.patchValue({
        isProduct: false
      });

      this.localTotal = '';
      this.totalCases = '';
      this.totalPairs = '';
      this.total = '';
    }
  }

  onSelectedCustomer(customer: Customer) {
    this.curCustomer = customer;
    if (this.curCustomer !== null) {
      this.order.companyName = this.curCustomer.companyName;
      this.order.dba = this.curCustomer.dba;
      this.order.billingAddress = this.curCustomer.addresses.find(
        address => address.billing
      );
      this.order.sippingAddress = this.curCustomer.addresses.find(
        address => !address.billing
      );

      this.orderForm.patchValue({
        isCustomer: true
      });
    }
  }

  onChangeSippingAddress(index) {
    this.order.sippingAddress = this.curCustomer.addresses[index];
  }

  onSubmit() {
    this.formStorageService.addOrder(
      transformOrderData(this.orderForm, this.order)
    );
    this.orderForm.reset();
    this.resetForm();
    this.resetSales();
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
    this.totalCases = '';
    this.totalPairs = '';
    this.total = '';
  }

  resetSales() {
    this.sales.forEach(element => {
      element.nativeElement.className = 'btn btn-primary';
      element.nativeElement.control.checked = false;
    });
    this.showTotal.nativeElement.checked = false;
  }

  onShowTotal(event) {
    (event.target.checked) ? this.orderCalculate() : this.localTotal = '';
  }

  onSalesPersonChanged(code: string) {
    this.order.salesPerson = this.salesPersons.find(man => man.code === code);

    this.orderForm.patchValue({
      showCode: code
    });
  }
}
