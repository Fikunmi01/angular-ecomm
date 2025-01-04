import { Component, Input, signal, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/category.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-category-item',
  standalone: true,
  imports: [],
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent {
  @Input() category: Category[] = [];
  cartService = inject(CartService);

  categories = signal<Category[]>([]);
  loading = signal<boolean>(false);

  constructor(
    public cart: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const categoryUrl = this.route.snapshot.paramMap.get('url');
    if (categoryUrl) {
      const data = history.state.category;
      if (!data) {
        console.error('No category found with the given name');
        this.router.navigate(['/']); // Redirect to home or another appropriate page
      } else {
        console.log('category:', data); // Log the product to verify all properties
        this.category = data || []; // Assign the product data or an empty array if data is undefined
      }
    } else {
      console.error('No category name in route');
      this.router.navigate(['/']); // Redirect to home or another appropriate page
    }
  }
}
