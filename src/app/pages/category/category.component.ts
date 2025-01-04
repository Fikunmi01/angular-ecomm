import { Component, inject, Input, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Category } from '../../models/category.model';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  @Input() category: Category[] = [];
  cartService = inject(CartService);

  categories = signal<Category[]>([]);
  loading = signal<boolean>(false);

  constructor(public cart: CartService, private router: Router) {}

  
  categoryArray = [
    {
      img: 'assets/beautyImg.jpg',
    },
    {
      img: 'assets/fragranceImg.jpg',
    },
    {
      img: 'assets/furnitureProduct.jpg',
    },
    {
      img: 'assets/groceryImg.jpg',
    },
    {
      img: 'assets/decorImg.jpg',
    },
    {
      img: 'assets/kitchenImg.jpg',
    },
    {
      img: 'assets/laptopImg.jpg',
    },
    {
      img: 'assets/menShirtImg.jpg',
    },
    {
      img: 'assets/shoeCateg.jpg',
    },
    {
      img: 'assets/watchCateg.jpg',
    },
    {
      img: 'assets/mobileAccCateg.jpg',
    },
    {
      img: 'assets/motorcyleCateg.jpg',
    },
    {
      img: 'assets/skincareCategs.jpg',
    },
    {
      img: 'assets/phoneCateg.jpg',
    },
    {
      img: 'assets/sportCateg.jpg',
    },
    {
      img: 'assets/sunglassCateg.jpg',
    },
    {
      img: 'assets/tabletCateg.jpg',
    },
    {
      img: 'assets/topCateg.jpg',
    },
    {
      img: 'assets/carCateg.jpg',
    },
    {
      img: 'assets/bagCateg.jpg',
    },
    {
      img: 'assets/dressCateg.jpg',
    },
    {
      img: 'assets/jewelleryCateg.jpg',
    },
    {
      img: 'assets/womenShoeCateg.jpg',
    },
    {
      img: 'assets/womenWatchCateg.jpg',
    },
  ];

  async ngOnInit() {
    this.loading.set(true); // Set loading to true before API call

    // Fetch categories data
    const response = await fetch('https://dummyjson.com/products/categories');
    const data = await response.json();
    console.log('data', data);

    const categories = data.map((category: any) => ({
      slug: category.slug,
      name: category.name,
      url: category.url,
    }));

    this.categories.set(categories);
  }

  viewCategory() {
    this.router.navigate(['/category', this.category[0].url.toString()], { state: { categories: this.category } });
  }
}
