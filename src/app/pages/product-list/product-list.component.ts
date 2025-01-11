import { Component, OnInit, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ServicesService } from '../../services/services/services.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  products = signal<Product[]>([]);
  loading: boolean = false;
  // loading = signal<boolean>(false); // Add loading property

  constructor(private setupService: ServicesService) {}
  shoes = [] as Array<any>;
  shirt = [] as Array<any>;

  ngOnInit(): void {
    this.loading = true; // Set loading to true before API call

    forkJoin({
      shirts: this.setupService.getMenShirt(),
      shoes: this.setupService.getMenShoe(),
    }).subscribe((res: any) => {
      this.shirt = res.shirts.products;
      this.shoes = res.shoes.products;
      this.products.update((currentProducts) => [...this.shirt, ...this.shoes]);
      this.loading = false;
    });
  }
}

// async ngOnInit() {
//   this.loading.set(true); // Set loading to true before API call

//   // Fetch Men Shirt Data
//   const response = await fetch(
//     'https://dummyjson.com/products/category/mens-shirts'
//   );

//   const data = await response.json();
//   const products = data.products.map((product: any) => ({
//     id: product.id,
//     title: product.title,
//     thumbnail: product.thumbnail,
//     image: product.images[0],
//     price: product.price,
//     stock: product.stock,
//     quantity: product.quantity,
//     rating: product.rating,
//     tags: product.tags,
//     availabilityStatus: product.availabilityStatus,
//     brand: product.brand,
//     category: product.category,
//     description: product.description,
//     dimensions: product.dimensions,
//     discountPercentage: product.discountPercentage,
//     images: product.images,
//     meta: product.meta,
//     minimumOrderQuantity: product.minimumOrderQuantity,
//     returnPolicy: product.returnPolicy,
//     reviews: product.reviews,
//     shippingInformation: product.shippingInformation,
//     sku: product.sku,
//     warrantyInformation: product.warrantyInformation,
//     weight: product.weight,
//   }));

//   this.products.set(products);

//   // Fetch men shoe data
//   const shoeRes = await fetch(
//     'https://dummyjson.com/products/category/mens-shoes'
//   );

//   const shoeData = await shoeRes.json();
//   const shoes = shoeData.products.map((product: any) => ({
//     id: product.id,
//     title: product.title,
//     thumbnail: product.thumbnail,
//     image: product.images[0],
//     price: product.price,
//     stock: product.stock,
//     quantity: product.quantity,
//     rating: product.rating,
//     tags: product.tags,
//     availabilityStatus: product.availabilityStatus,
//     brand: product.brand,
//     category: product.category,
//     description: product.description,
//     dimensions: product.dimensions,
//     discountPercentage: product.discountPercentage,
//     images: product.images,
//     meta: product.meta,
//     minimumOrderQuantity: product.minimumOrderQuantity,
//     returnPolicy: product.returnPolicy,
//     reviews: product.reviews,
//     shippingInformation: product.shippingInformation,
//     sku: product.sku,
//     warrantyInformation: product.warrantyInformation,
//     weight: product.weight,
//   }));

//   // Combine shirt and shoe data
//   this.products.update((currentProducts) => [...currentProducts, ...shoes]);

//   this.loading.set(false); // Set loading to false after data is loaded
// }
// }
// // console.log('We are here')
// // Fetch men shirt data
// this.setupService.getMenShirt().subscribe((res) => {
//   this.shirt = res.products;
//   // console.log(this.shirt, 'shirt exists here');
// });

// this.setupService.getMenShoe().subscribe((res: any) => {
//   this.shoes = res.products;
//   // console.log(this.shoes, 'shoes here');
// });

// this.products.update((currentProducts) => [...this.shirt, ...this.shoes]);
// this.loading = true;
