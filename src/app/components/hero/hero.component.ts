import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { ProductListComponent } from '../../pages/product-list/product-list.component';
import { ServicesService } from '../../services/services/services.service';
import { Category } from '../../models/category.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    ProductListComponent,
    RouterLink,
  ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  @Input() products: Product[] = [];
  @Input() category: Category[] = [];
  cartService = inject(CartService);

  categories = signal<Category[]>([]);
  loading = signal<boolean>(false);
  @Input() product!: Product;

  sellerArray = [
    {
      img: 'assets/Rectangle 1.png',
      title: 'Gray Polo Shirt',
      price: '49.00',
    },
    {
      img: 'assets/Rectangle 1 (1).png',
      title: 'Red Shirt',
      price: '69.00',
    },
    {
      img: 'assets/Rectangle 1 (2).png',
      title: 'Polo White Shirt',
      price: '29.00',
    },
    {
      img: 'assets/Rectangle 1 (3).png',
      title: 'Pink Casual Shirt',
      price: '39.00',
    },
  ];

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
  ];

  heroArray = [
    {
      img: 'assets/imgShirt.png',
      title: 'Plain White Shirt',
      price: '29.99',
    },
    {
      img: 'assets/imgShirt.png',
      title: 'Denim Jacket',
      price: '29.99',
    },
    {
      img: 'assets/imgShirt.png',
      title: 'Black Polo Shirt',
      price: '29.99',
    },
    {
      img: 'assets/imgShirt.png',
      title: 'Blue SweatShirt',
      price: '79.99',
    },
    {
      img: 'assets/imgShirt.png',
      title: 'Blue Plain Shirt',
      price: '49.00',
    },
    {
      img: 'assets/imgShirt.png',
      title: 'Dark Blue Shirt',
      price: '89.00',
    },
    {
      img: 'assets/imgShirt.png',
      title: 'Outcast T Shirt',
      price: '19.00',
    },
    {
      img: 'assets/imgShirt.png',
      title: 'Polo Plain Shirt',
      price: '29.00',
    },
  ];

  constructor(private service: ServicesService, private router: Router) {}

  viewCategory(category: Category) {
    this.router.navigate(['/category', category.slug], { state: { category } });
  }

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

    // Fetch men shoe data
    const shoeRes = await fetch(
      'https://dummyjson.com/products/category/mens-shoes'
    );

    const shoeData = await shoeRes.json();
    const shoes = shoeData.products.map((product: any) => ({
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      image: product.images[0],
      price: product.price,
      stock: product.stock,
      quantity: product.quantity,
      rating: product.rating,
      tags: product.tags,
      availabilityStatus: product.availabilityStatus,
      brand: product.brand,
      category: product.category,
      description: product.description,
      dimensions: product.dimensions,
      discountPercentage: product.discountPercentage,
      images: product.images,
      meta: product.meta,
      minimumOrderQuantity: product.minimumOrderQuantity,
      returnPolicy: product.returnPolicy,
      reviews: product.reviews,
      shippingInformation: product.shippingInformation,
      sku: product.sku,
      warrantyInformation: product.warrantyInformation,
      weight: product.weight,
    }));

    // Combine shirt and shoe data
    this.products = [...this.products, ...shoes];

    this.loading.set(false); // Set loading to false after data is loaded
  }
}
