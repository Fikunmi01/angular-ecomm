import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
})
export class OrderSummaryComponent {
  cartService = inject(CartService);

  total = computed(() => {
    let total = 0;

    for (const item of this.cartService.cart()) {
      total += item.price * (item.quantity ?? 1);
    }

    return Math.round(total * 100) / 100;
  });
}
