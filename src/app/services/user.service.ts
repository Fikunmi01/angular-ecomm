// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private firstName: string = '';
//   private isLoggedIn: boolean = false;

//   constructor() {
//     this.logoutIfLocalhostRebundles();
//     this.checkLoginStatus();
//   }

//   checkLoginStatus() {
//     if (localStorage.getItem('access_token')) {
//       this.isLoggedIn = true;
//       this.firstName = localStorage.getItem('firstname') || '';
//     } else {
//       this.isLoggedIn = false;
//       this.firstName = '';
//     }
    
//   }

//   logoutIfLocalhostRebundles() {
//     if (window.location.hostname === 'localhost' && !this.isSessionActive()) {
//       this.logout();
//     } else {
//       localStorage.setItem('session_active', 'true');
//     }
//   }

//   isSessionActive(): boolean {
//     return localStorage.getItem('access_token') !== null;
//   }

//   logout() {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('firstname');
//     localStorage.removeItem('session_active');
//     this.isLoggedIn = false;
//     this.firstName = '';
//     this.checkLoginStatus(); // Ensure the login status is checked after logout
//   }

//   getFirstName(): string {
//     return this.firstName;
//   }

//   getIsLoggedIn(): boolean {
//     return this.isLoggedIn;
//   }
// }
