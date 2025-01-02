import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  productUrl = environment.productUrl;

  // constructor(private httpClient: HttpClient) {}

  // getMenShirt(): Observable<any> {
  //   return this.httpClient.get(`${this.productUrl}mens-shirts`);
  // }

  // getMenShoe() {
  //   return this.httpClient.get(`${this.productUrl}mens-shoes`);
  // }
}
