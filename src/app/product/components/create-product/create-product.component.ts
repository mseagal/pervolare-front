import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateProduct } from '@app/interfaces/product/create-product.inteface';
import { ProductService } from '@app/product/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    value: ['', [Validators.required, Validators.min(0)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
  });

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.createProduct(this.productForm.value as any).subscribe({
        next: () => {
          console.log('creado correctamente');
          this.router.navigate(['/products']);
        },
        error: () => {
          console.log('ha ocurrido un error');
        },
      });
    } else {
      console.log('form invalido');
    }
  }
}
