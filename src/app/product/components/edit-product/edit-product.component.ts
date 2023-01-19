import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@app/product/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  productId: number;
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    value: [0, [Validators.required, Validators.min(0)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.productId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.fillProductForm(this.productId);
  }

  fillProductForm(productId: number) {
    this.productService.getOneProduct(productId).subscribe({
      next: (data) => {
        if (data) {
          this.productForm.patchValue({
            name: data.name,
            value: data.value,
            description: data.description,
          });
        } else {
          this.router.navigate(['/products']);
        }
      },
      error: (error) => {
        console.log('ha ocurrido un error al obtener el registro');
        this.router.navigate(['/products']);
      },
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.updateProduct(this.productId, this.productForm.value as any).subscribe({
        next: () => {
          console.log('ACtualizado correctamente');
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.log('ha ocurrido un error al actualizar el registro', error);
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
