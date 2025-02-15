import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private firstName: string = '';
  private isLoggedIn: boolean = false;

  constructor() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    if (localStorage.getItem('access_token')) {
      this.isLoggedIn = true;
      this.firstName = localStorage.getItem('firstname') || '';
    } else {
      this.isLoggedIn = false;
      this.firstName = '';
    }
  }

  getFirstName(): string {
    return this.firstName;
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
