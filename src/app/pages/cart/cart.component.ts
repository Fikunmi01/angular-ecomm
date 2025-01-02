import { Component, inject, input, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CartItemComponent,
    OrderSummaryComponent,
    NavbarComponent,
    FooterComponent,
    ButtonComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  item = input.required<Product>();

  cartService = inject(CartService);
  private cdr = inject(ChangeDetectorRef);

  incrementQuantity(id: number) {
    this.cartService.incrementQuantity(id);
    this.cdr.markForCheck();
  }

  decrementQuantity(id: number) {
    this.cartService.decrementQuantity(id);
    this.cdr.markForCheck();
  }

  getTotalQuantity() {
    return this.cartService.cart().reduce((total, item) => total + (item.quantity ?? 0), 0);
  }
}
