import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
  { path: '', component: ProductComponent, data: { title: marker('Products') } },
  { path: 'create', component: CreateProductComponent, data: { title: marker('Create Product') } },
  { path: ':id', component: EditProductComponent, data: { title: marker('Edit Product') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
