import { Component, inject, input, signal, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { ServicesService } from '../../services/services/services.service';
import { BlogComponent } from '../../components/blog/blog.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, HeroComponent, FooterComponent, BlogComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  item = input.required<Product>();
  products = signal<Product[]>([]);
  loading: boolean = true;

  constructor(private service: ServicesService) {
    this.loading = false;
  }

  cartService = inject(CartService);
}
