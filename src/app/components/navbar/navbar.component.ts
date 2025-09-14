import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
// import { UserService } from '../../services/user.service';

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
    private cartService: CartService
  ) // private userService: UserService
  {}

  ngOnInit(): void {
    this.cartService.cartItems.subscribe((items) => {
      this.cartItemCount = items.length;
    });
    this.checkLoginStatus(); // Update the component's login status
  }

  checkLoginStatus() {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      this.isLoggedIn = true;
      this.firstname = localStorage.getItem('firstname') || '';
    } else {
      this.isLoggedIn = false;
      this.firstname = '';
      this.logout(); // Ensure the user is logged out if the token is not present
    }
    console.log(this.firstname, 'first name hereee');
    console.log(this.isLoggedIn, 'logged in status hereee');
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('firstname');
    localStorage.removeItem('session_active');
    this.isLoggedIn = false;
    this.firstname = '';
  }

  getTotalQuantity() {
    return this.cartService
      .cart()
      .reduce((total, item) => total + (item.quantity ?? 0), 0);
  }

  toggle: boolean = false;

  setMenuState() {
    this.toggle = !this.toggle;
    // Prevent body scroll when menu is open
    if (this.toggle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  closeMenuOnOverlay(event: Event) {
    if (event.target === event.currentTarget) {
      this.setMenuState();
    }
  }
}
