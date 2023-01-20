import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCharacteristicToProduct } from '@app/interfaces/product/add-characteristic-to-product.interface';
import { CreateProduct } from '@app/interfaces/product/create-product.inteface';
import { ProductWithCombinationsDto } from '@app/interfaces/product/product-with-combinations.interface';
import { Product } from '@app/interfaces/product/product.interface';
import { UpdateProduct } from '@app/interfaces/product/update-product.interface';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.serverUrl}/product`);
  }

  getOneProduct(id: number): Observable<ProductWithCombinationsDto> {
    return this.http.get<ProductWithCombinationsDto>(`${environment.serverUrl}/product/${id}`);
  }

  createProduct(createProduct: CreateProduct): Observable<Product> {
    return this.http.post<Product>(`${environment.serverUrl}/product`, createProduct);
  }

  updateProduct(id: number, updateProduct: UpdateProduct): Observable<Product> {
    return this.http.put<Product>(`${environment.serverUrl}/product/${id}`, updateProduct);
  }

  deleteProduct(id: number): Observable<null> {
    return this.http.delete<null>(`${environment.serverUrl}/product/${id}`);
  }

  addCharacteristicToProduct(id: number, addCharacteristicToProduct: AddCharacteristicToProduct): Observable<null> {
    return this.http.post<null>(`${environment.serverUrl}/product/${id}/characteristic`, addCharacteristicToProduct);
  }
}
