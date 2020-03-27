import { Address } from './customer/Address';
import { SalesPerson } from './SalesPerson';
import { SizeRun } from './SizeRun';
import { Product } from './Product';

export class Order {
  id: string;
  orderNumber: string;
  orderTakenBy: string;
  salesPerson: SalesPerson;
  amount: number;
  orderComments: string;
  shipEarly: boolean;
  totalCases: number;
  totalPairs: number;
  total: number;
  billingAddress: Address;
  shippingAddress: Address;
  dateSold: Date;
  shipVia: string;
  customerPo: string;
  terms: string;
  dept: string;
  products: Array<Product>;
  companyName: string;
  dba: string;
  shipTo: string;
  orderTaken: string;
  orderType: string;
}
