import { LastSeason } from './LastSeason';
import { ProductImage } from './ProductImage';
import { ProductColor } from './ProductColor';
import { SizeRun } from './SizeRun';

export class Product {

  get Id() {
    return this.id;
  }
  get Sku() {
    return this.sku;
  }
  get Quantities() {
    return this.quantities;
  }
  set Quantities(val) {
    this.quantities = val;
  }

  get Color() {
    return this.color.colorName;
  }
  get Run() {
    return this.sizeRun.run;
  }

  get Price() {
    return this.price;
  }
  set Price(val) {
    this.price = val;
  }

  get CustomerSku() {
    return this.customerSku;
  }

  set CustomerSku(val) {
    this.customerSku = val;
  }

  get SpecialInstructions() {
    return this.specialInstructions;
  }
  set SpecialInstructions(val) {
    this.specialInstructions = val;
  }

  get Pairs() {
    return this.sizeRun.totalPairs;
  }
  set Pairs(val) {
    this.sizeRun.totalPairs = val;
  }

  get EtaFrom() {
    return this.etaStart1;
  }
  set EtaFrom(val) {
    this.etaStart1 = val;
  }

  get EtaTo() {
    return this.etaEnd1;
  }
  set EtaTo(val) {
    this.etaEnd1 = val;
  }

  get Image() {
    return this.mainImg.img;
  }

  id: number;
  thumbnail: boolean;
  quantities: number;
  specialInstructions: string;
  pares: number;
  mainImg: ProductImage;
  color: ProductColor;
  sizeRun: SizeRun;
  sku: string;
  customerSku: null;
  price: number;
  customerNumber: null;
  customerShipTo: null;
  style: string;
  factoryStyle: null;
  construction: string;
  productName: string;
  productType: string;
  isMakeup: boolean;
  factory: string;
  brand: string;
  box: string;
  boxLength: number;
  boxWidth: number;
  boxHeight: number;
  boxWeight: number;
  department: string;
  description: string;
  catalogPage: string;
  purchaseOrder: string;
  customerPurchaseOrder: string;
  keywords: string[];
  collageImg: null;
  specSheetImg: null;
  lastSeason: LastSeason;
  upc: string;
  classCode: string;
  whslPriceCurr: number;
  whslPriceOrig: number;
  retailPriceCurr: number;
  retailPriceOrig: number;
  msrp: number;
  firstCost: number;
  dutyPerc: number;
  agentPerc: number;
  freightCost: number;
  officeCost: number;
  landedCost: number;
  availableQty: number;
  bookedQty: number;
  futureAvlQty: number;
  totalAvlQty: number;
  futureQty1: number;
  etaStart1: Date;
  etaEnd1: Date;
  futureQty2: number;
  etaStart2: string;
  etaEnd2: string;
  futureQty3: number;
  etaStart3: string;
  etaEnd3: string;
  futureQty4: number;
  etaStart4: string;
  etaEnd4: string;
  caseLength: number;
  caseWidth: number;
  caseHeight: number;
  caseWeight: number;
  isActive: boolean;
  dateCreated: Date;
  dateModified: Date;
  dateDeleted: null;
  children?: Array<ProductChild> = [];
}

export class ProductChild {
  size: string;
  upc: string;
}
