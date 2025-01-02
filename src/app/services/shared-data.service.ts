import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  setProducts(products: Product[]): void {
    this.productsSubject.next(products);
  }

  getProducts(): Product[] {
    return this.productsSubject.getValue();
  }
}