import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  cartItemCount: number = 0;
  firstname: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems.subscribe((items) => {
      this.cartItemCount = items.length;
    });
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = this.userService.getIsLoggedIn();
    this.firstname = this.userService.getFirstName();
    console.log(this.firstname,'first name hereee')
    console.log(this.isLoggedIn,'logged in status hereee')
  }

  getTotalQuantity() {
    return this.cartService
      .cart()
      .reduce((total, item) => total + (item.quantity ?? 0), 0);
  }
}
