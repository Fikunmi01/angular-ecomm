import { Component, inject, input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ButtonComponent } from '../../components/button/button.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  item = input.required<Product>();
  cartService=inject(CartService)
}
