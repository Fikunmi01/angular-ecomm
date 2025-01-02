
import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss'],
})
export class OtherComponent implements OnInit {
  products: Product[] = [];

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.products = this.sharedDataService.getProducts();
    console.log('Products in OtherComponent:', this.products);
  }
}