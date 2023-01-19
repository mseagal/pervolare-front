import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductComponent, CreateProductComponent, EditProductComponent],
  imports: [CommonModule, ProductRoutingModule, FormsModule, ReactiveFormsModule],
})
export class ProductModule {}
