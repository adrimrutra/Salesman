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

  constructor(
    private modalService: BsModalService,
    private formStorageService: FormStorageService
  ) {
    // if (!this.products) {
    //   this.products = new Array<Product>();
    // }
  }

  ngOnInit() {
    this.formStorageService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onOpenProductModal(template: TemplateRef<any>) {
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
    } else {
      const p = this.products.find(e => e.id === +event.target.value);
      p.quantities = 0;
    }
  }

  onSelectProducts() {
    const newProd = this.products.filter(
      prod => prod.thumbnail && prod.quantities > 0
    );
    this.selectedProducts.emit(newProd);
    this.modalRef.hide();
  }

  onClose() {
    this.selectedProducts.emit(this.newProducts);
  }
}
