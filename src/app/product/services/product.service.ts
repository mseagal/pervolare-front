import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProduct } from '@app/interfaces/product/create-product.inteface';
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

  getOneProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.serverUrl}/product/${id}`);
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
}
