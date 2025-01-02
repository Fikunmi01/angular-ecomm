import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [PrimaryButtonComponent],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(public cart: CartService, private router: Router) {}

  addToCart() {
    this.cart.addToCart(this.product);
  }

  viewProduct() {
    this.router.navigate(['/item', this.product.id.toString()], { state: { product: this.product } });
  }
}
