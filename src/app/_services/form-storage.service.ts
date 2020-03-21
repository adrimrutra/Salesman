import { Injectable } from '@angular/core';
import { Customer } from '../_models/customer/Customer';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SalesPerson } from '../_models/SalesPerson';
import { Order } from '../_models/Order';
import { Product } from '../_models/Product';
import { AlertifyService } from './alertify.service';

@Injectable()
export class FormStorageService {

constructor(private http: HttpClient, private alertify: AlertifyService) { }
  products: Product[];
  customers: Customer[];
  salesRep: SalesPerson[];

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('../assets/_data/products.json').pipe(map((data) => {
          return plainToClass(Product, data);
    }));
  }

  getSalesPersons(): Observable<SalesPerson[]> {
    return this.http.get<SalesPerson[]>('../assets/_data/salespersons.json').pipe(map((data) => {
        return plainToClass(SalesPerson, data);
        }));
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>('../assets/_data/customers.json').pipe(map((data) => {
      return plainToClass(Customer, data);
      }));
  }

  addCustomer(customer: Customer) {
    console.log(customer);
    this.alertify.success('Customer was successfully created!.');
  }

  addOrder(order: Order) {
    console.log(order);
    this.alertify.success('Order was successfully created!.');
  }

}
