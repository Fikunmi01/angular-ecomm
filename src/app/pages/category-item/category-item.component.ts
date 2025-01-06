import { Component, Input, signal, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/category.model';
import { CartService } from '../../services/cart.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-category-item',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule,
    PrimaryButtonComponent,
  ],
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent {
  @Input() category: Category[] = [];
  cartService = inject(CartService);
  @Input() product!: Product;

  categories = signal<Category[]>([]);
  loading = signal<boolean>(false);
  specificCategory: any[] = []; // Update this line

  constructor(
    public cart: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const categoryUrl = this.route.snapshot.paramMap.get('name');
    if (categoryUrl) {
      const data = history.state.category;
      const catItem = await fetch(data.url);
      const specificCategory = await catItem.json();
      this.specificCategory = specificCategory.products;
      console.log('data for category', specificCategory);
      if (!data) {
        console.error('No category found with the given name');
        this.router.navigate(['/']); // Redirect to home or another appropriate page
      } else {
        console.log('category:', data); // Log the category to verify all properties
        this.category = [data]; // Assign the category data
      }
    } else {
      console.error('No category name in route');
      this.router.navigate(['/']); // Redirect to home or another appropriate page
    }
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  viewProduct(product: any) {
    const productId = product.id;
    if (productId) {
      this.router.navigate(['/item', productId.toString()], {
        state: { product },
      });
    } else {
      console.error('Product ID not found');
    }
  }
}
