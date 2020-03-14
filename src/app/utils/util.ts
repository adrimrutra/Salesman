import { FormGroup } from '@angular/forms';
import { Customer } from '../_models/customer/Customer';
import { Contact } from '../_models/customer/Contact';
import { Address } from '../_models/customer/Address';
import { Order } from '../_models/Order';
import { SalesPerson } from '../_models/SalesPerson';

export const transformData = (form: FormGroup, salesPersons: SalesPerson[]) => {
  const customer = new Customer();
  customer.addresses = new Array<Address>();
  const contact = new Contact();

  customer.companyName = form.value.companyName;
  customer.dba = form.value.dba;
  customer.vatNumber = form.value.vatNumber;
  customer.website = form.value.website;
  customer.email = form.value.email;
  customer.phoneCell = form.value.phoneCell;
  customer.phoneLandline = form.value.phoneLandline;
  customer.salesperson1 = salesPersons.find(e => e.code === form.value.salesperson1);
  customer.salesperson2 = salesPersons.find(e => e.code === form.value.salesperson2);
  customer.notes = form.value.notes;

  contact.firstName = form.value.contactFirstName;
  contact.lastName = form.value.contactLastName;
  contact.email = form.value.contactEmail;
  contact.phoneCell = form.value.contactPhoneCell;
  contact.phoneLandline = form.value.contactPhoneLandline;
  contact.fax = form.value.contactFax;
  contact.isResidence = form.value.contactIsResidence;

  form.value.addresses.forEach(element => {
    const address = new Address();
    address.street1 = element.street1;
    address.street2 = element.street2;
    address.city = element.city;
    address.postcode = element.postcode;
    address.state = element.state;
    address.country = element.country;
    address.paymentTerms = element.paymentTerms;
    address.shippingPreference = element.shippingPreference;
    address.shippingPreferenceAccount = element.shippingPreferenceAccount;
    address.shippingInstructions = element.shippingInstructions;
    address.billing = element.billing;
    address.contact = contact;
    customer.addresses.push(address);
  });
  return customer;
};



export const transformOrderData = (form: FormGroup, order: Order) => {
  order.orderTaken = form.value.orderTaken;
  order.orderNumber = form.value.orderNumber;
  order.dateSold = form.value.dateSold;
  order.shipVia = form.value.shipVia;
  order.customerPo = form.value.customerPo;
  order.terms = form.value.terms;
  order.dept = form.value.dept;
  order.shipEarly = form.value.shipEarly;
  order.orderComments = form.value.orderComments;
  order.orderType = form.value.orderType;
  return order;
};
