import { Component, inject, input, signal, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { ServicesService } from '../../services/services/services.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, HeroComponent, FooterComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  item = input.required<Product>();
  products = signal<Product[]>([]);

  constructor(private service: ServicesService) {}

  async ngOnInit() {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    this.products.set(data);
  }
  cartService = inject(CartService);
}
