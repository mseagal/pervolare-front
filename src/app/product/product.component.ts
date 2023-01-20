import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlertService } from '@app/@shared/alert.service';
import { Product } from '@app/interfaces/product/product.interface';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, AfterViewInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private alertService: AlertService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: () => {
        this.alertService.showAlert('No se pudo obtener los productos', '', 'error');
      },
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.alertService.showAlert('Eliminado correctamente', '', 'success');
        this.getAllProducts();
      },
      error: () => {
        this.alertService.showAlert('No se pudo eliminar', '', 'error');
      },
    });
  }
}
