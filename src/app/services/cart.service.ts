import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';
import { debounceTime } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartItems = new BehaviorSubject<any[]>([]);
  cartItems = this._cartItems.asObservable();

  cart = signal<Product[]>([
    // {
    //   id: 2,
    //   title: 'Mens Casual Premium Slim Fit T-Shirts',
    //   image:
    //     'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    //   price: 22.3,
    //   stock: 0,
    //   quantity: 1,
    //   rating: 4.5,
    //   tags: ['clothing'],
    //   availabilityStatus: 'In Stock',
    //   brand: 'Fashion Trends',
    //   category: 'mens-shirts',
    //   description: 'A premium slim fit t-shirt for men.',
    //   dimensions: { width: 15, height: 20, depth: 5 },
    //   discountPercentage: 10,
    //   images: ['https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg'],
    //   meta: { createdAt: '2024-05-23T08:56:21.623Z', updatedAt: '2024-05-23T08:56:21.623Z' },
    //   minimumOrderQuantity: 1,
    //   returnPolicy: '30 days return policy',
    //   reviews: [{ rating: 4, comment: 'Great product!', date: '2024-05-23T08:56:21.623Z' }],
    //   shippingInformation: 'Ships in 1 week',
    //   sku: 'SKU12345',
    //   warrantyInformation: '1 year warranty',
    //   weight: 0.5,
    // },

    // {
    //   id: 3,
    //   title: 'Mens Cotton Jacket',
    //   image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    //   price: 55.99,
    //   stock: 20,
    //   quantity: 1,
    //   rating: 4.7,
    //   tags: ['clothing'],
    //   availabilityStatus: 'In Stock',
    //   brand: 'Fashion Trends',
    //   category: 'mens-jackets',
    //   description: 'A stylish cotton jacket for men.',
    //   dimensions: { width: 18, height: 25, depth: 7 },
    //   discountPercentage: 15,
    //   images: ['https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg'],
    //   meta: { createdAt: '2024-05-23T08:56:21.623Z', updatedAt: '2024-05-23T08:56:21.623Z' },
    //   minimumOrderQuantity: 1,
    //   returnPolicy: '30 days return policy',
    //   reviews: [{ rating: 5, comment: 'Excellent jacket!', date: '2024-05-23T08:56:21.623Z' }],
    //   shippingInformation: 'Ships in 1 week',
    //   sku: 'SKU67890',
    //   warrantyInformation: '1 year warranty',
    //   weight: 1.0,
    // },
  ]);

  cartUpdated = signal<number>(0);

  addToCart(product: Product) {
    const existingProduct = this.cart().find((p) => p.id === product.id);
    if (existingProduct) {
      this.cart.set(
        this.cart().map((item) =>
          item.id === product.id && item.quantity !== undefined ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      this.cart.set([...this.cart(), { ...product, quantity: 1 }]);
    }
    this.cartUpdated.set(this.cartUpdated() + 1);
    const currentItems = this._cartItems.value;
    this._cartItems.next([...currentItems, product]);
  }

  removeFromCart(id: number) {
    this.cart.set(this.cart().filter((p) => p.id !== id));
    this.cartUpdated.set(this.cartUpdated() + 1);
  }

  updateQuantity(id: number, quantity: number) {
    const newQuantity = Math.max(+quantity, 1); // Ensure quantity is at least 1
    this.cart.set(
      this.cart().map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  incrementQuantity(id: number) {
    this.cart.set(
      this.cart().map((item) =>
        item.id === id && item.quantity !== undefined ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  decrementQuantity(id: number) {
    this.cart.set(
      this.cart().map((item) =>
        item.id === id && item.quantity !== undefined && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  }

  private quantityChange$ = new Subject<{ id: number; quantity: number }>();

  constructor() {
    this.quantityChange$
      .pipe(debounceTime(300))
      .subscribe(({ id, quantity }) => {
        this.cart.set(
          this.cart().map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
        );
      });
  }
}
