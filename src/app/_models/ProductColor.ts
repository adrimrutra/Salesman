import { ProductImage } from './ProductImage';

export class ProductColor {
  id: number;
  colorCode: number;
  colorName: string;
  images: Array<ProductImage>;
}
