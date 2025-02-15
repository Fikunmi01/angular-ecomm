import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  productUrl = environment.productUrl;
  categoryUrl = environment.categoryUrl;
  baseUrl = environment.apiBaseUrl;
  private userListSubject = new BehaviorSubject<any[]>([]);
  userList$ = this.userListSubject.asObservable();
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  getMenShirt(): Observable<any> {
    return this.httpClient.get(`${this.productUrl}mens-shirts`);
  }

  getMenShoe() {
    return this.httpClient.get(`${this.productUrl}mens-shoes`);
  }

  getCategory() {
    return this.httpClient.get(`${this.categoryUrl}`);
  }

  signUp(payload: any) {
    return this.httpClient.post(`${this.baseUrl}api/auth/signup`, payload);
  }

  setUserList(userList: any[]) {
    this.userListSubject.next(userList);
  }

  setCurrentUser(user: any) {
    this.currentUserSubject.next(user);
  }

  login(payload: any) {
    return this.httpClient.post(`${this.baseUrl}api/auth/signin`, payload);
  }

  verifyEmail(token: string) {
    return this.httpClient.get(
      `${this.baseUrl}api/auth/verify-email?token=${token}`
    );
  }

  forgotPassword(payload: any) {
    return this.httpClient.post(
      `${this.baseUrl}api/auth/forgot-password`,
      payload
    );
  }

  verifypwdReset(payload: any) {
    return this.httpClient.post(
      `${this.baseUrl}api/auth/reset-password`,
      payload
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.httpClient.post(`${this.baseUrl}api/auth/refresh-token`, {
      refreshToken,
    });
  }

  storeUserData(userData: any) {
    localStorage.setItem('access_token', userData.access_token);
    localStorage.setItem('refresh_token', userData.refresh_token);
    localStorage.setItem('_id', userData._id);
    localStorage.setItem('firstname', userData.firstname);
    localStorage.setItem('lastname', userData.lastname);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('country', userData.country);
  }

  getUserId() {
    return localStorage.getItem('_id');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }
}
