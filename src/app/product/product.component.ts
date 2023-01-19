import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Product } from '@app/interfaces/product/product.interface';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, AfterViewInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log(data);
      },
      error: () => {
        alert('Ha ocurrido un error');
      },
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        console.log('eliminado correctamente');
        this.getAllProducts();
      },
      error: () => {
        console.log('error al eliminar');
      },
    });
  }
}
