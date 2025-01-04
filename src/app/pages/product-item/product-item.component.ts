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
  currentImageIndex: number = 0;
  isLoading: boolean = false;

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
    }
  }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.isLoading = true;
      this.currentImageIndex--;
      this.updateDisplayedImage();
    }
  }

  nextImage() {
    if (
      this.product &&
      this.product.images &&
      this.currentImageIndex < this.product.images.length - 1
    ) {
      this.isLoading = true;
      this.currentImageIndex++;
      this.updateDisplayedImage();
    }
  }

  updateDisplayedImage() {
    const imageElement = document.querySelector(
      '.product-image'
    ) as HTMLImageElement;
    const loadingElement = document.querySelector(
      '.loading-video'
    ) as HTMLVideoElement;
    if (imageElement && loadingElement && this.product && this.product.images) {
      loadingElement.style.display = 'block';
      imageElement.style.display = 'none';
      imageElement.src = this.product.images[this.currentImageIndex];
      imageElement.onload = () => {
        this.isLoading = false;
        loadingElement.style.display = 'none';
        imageElement.style.display = 'block';
      };
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
