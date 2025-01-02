import { Component, OnInit, inject, signal } from '@angular/core';
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
  // allData = [] as Array<any>;

  constructor(private service: ServicesService) {}

  // ngOnInit(): void {
  //   this.service.getMenShirt().subscribe((res: any) => {
  //     this.allData = res.data;
  //     console.log(res.data, 'shirt loadsss')
  //   });
  // }

  async ngOnInit() {
    // Fetch Men Shirt Data

    const response = await fetch(
      'https://dummyjson.com/products/category/mens-shirts'
    );

    const data = await response.json();
    const products = data.products.map((product: any) => ({
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

    this.products.set(products);

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
    this.products.update((currentProducts) => [...currentProducts, ...shoes]);
  }
}
