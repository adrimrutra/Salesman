import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgGridModule } from 'ag-grid-angular';

import { GridModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

import { ModalModule, BsDatepickerModule, AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { OrderComponent } from './order/order.component';
import { AppRoutingModule } from './app.routing.module';

import { CustomerCreateComponent } from './customer/customer-create/customer-create.component';
import { CustomerSelectComponent } from './customer/customer-select/customer-select.component';
import { FormStorageService } from './_services/form-storage.service';
import { ProductsSelectComponent } from './products-select/products-select.component';
import { NavComponent } from './nav/nav.component';
import { AddressComponent } from './forms/address/address.component';

@NgModule({
   declarations: [
      AppComponent,
      OrderComponent,
      CustomerCreateComponent,
      CustomerSelectComponent,
      ProductsSelectComponent,
      NavComponent,
      AddressComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      BrowserAnimationsModule,
      AgGridModule.withComponents([]),
      ModalModule.forRoot(),
      BsDatepickerModule.forRoot(),
      AlertModule.forRoot(),

      GridModule,
      DateInputsModule
   ],
   providers: [
      FormStorageService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
