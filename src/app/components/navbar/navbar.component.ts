import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems.subscribe(items => {
      this.cartItemCount = items.length;
    });
  }

  getTotalQuantity() {
    return this.cartService
      .cart()
      .reduce((total, item) => total + (item.quantity ?? 0), 0);
  }
}
