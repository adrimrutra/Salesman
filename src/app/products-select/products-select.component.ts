import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormStorageService } from '../_services/form-storage.service';
import { Product } from '../_models/Product';

@Component({
  selector: 'app-products-select',
  templateUrl: './products-select.component.html',
  styleUrls: ['./products-select.component.css']
})
export class ProductsSelectComponent implements OnInit {
  @ViewChild('modalRef', { static: true }) modalRef: BsModalRef;
  @Input() newProducts: Array<Product> | null;
  @Output() selectedProducts = new EventEmitter<Product[]>();
  products: Array<Product>;
  isSelected = false;

  constructor(
    private modalService: BsModalService,
    private formStorageService: FormStorageService
  ) {}

  ngOnInit() {
    this.formStorageService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onOpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    if (this.newProducts) {
      this.formStorageService.getProducts().subscribe(products => {
        this.products = products;
        this.newProducts.forEach(newProduct => {
          const index = this.products.findIndex(
            prod => prod.id === newProduct.id
          );
          this.products[index] = newProduct;
        });
      });
    }
  }

  onThumbnail(event: any) {
    if (event.target.checked) {
      const p = this.products.find(
        e => e.id === +event.target.value && e.thumbnail
      );
      p.quantities++;
      this.isSelected = true;
    } else {
      const p = this.products.find(e => e.id === +event.target.value);
      p.quantities = 0;
      this.isSelected = false;
    }
  }

  onQuantitiesChanged() {
    const newProd = this.products.filter(prod => prod.thumbnail && prod.quantities > 0);
    (newProd.length > 0) ? this.isSelected = true : this.isSelected = false;
  }

  onSelectProducts() {
    const newProd = this.products.filter(prod => prod.thumbnail && prod.quantities > 0);
    this.selectedProducts.emit(newProd);
    this.modalRef.hide();
    this.isSelected = false;
  }

  onCloseModal() {
    this.selectedProducts.emit(this.newProducts);
    this.modalRef.hide();
    this.isSelected = false;
  }
}
