import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { SearchServiceService } from '../../services/search-service.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule,
    PrimaryButtonComponent,
  ],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  product!: Product; // Change from Product[] to Product
  descTab: boolean = true;
  revTab: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SearchServiceService
  ) {}

  public calculateOriginalPrice(
    price: number,
    discountPercentage?: number
  ): number {
    if (discountPercentage === undefined || discountPercentage === 0) {
      return price;
    }
    return parseFloat((price / (1 - discountPercentage / 100)).toFixed(2));
  }

  getRoundedRating(rating: number): number {
    return Math.round(rating);
  }

  checkReview() {
    if (!this.revTab) {
      this.descTab = false;
    } else this.descTab = true;
  }

  showDescription() {
    this.descTab = true;
    this.revTab = false;
  }

  showReviews() {
    this.descTab = false;
    this.revTab = true;
  }

  search(value: any) {
    const searchParam = value.target.value;
    if (searchParam) {
      if (this.sharedService.matchSearch(this.product, searchParam, ['id'])) {
        console.log('Product matches search:', this.product);
      } else {
        console.log('No match found for search:', searchParam);
      }
      // this.totalCount = this.states.length;
      // const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      // const endIndex = startIndex + this.itemsPerPage;
      // this.records = data.slice(startIndex, endIndex);
    } else {
      // this.getState();
    }
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      const data = history.state.product;
      if (!data) {
        console.error('No product found with the given ID');
        this.router.navigate(['/']); // Redirect to home or another appropriate page
      } else {
        console.log('Product:', data); // Log the product to verify all properties
        this.product = data; // Assign the product data
      }
    } else {
      console.error('No product ID found in route');
      this.router.navigate(['/']); // Redirect to home or another appropriate page
    }
  }
}
