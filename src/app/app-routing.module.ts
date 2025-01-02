import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ProductItemComponent } from './pages/product-item/product-item.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomepageComponent,
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'cart/order-summary',
    component: OrderSummaryComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'item/:id',
    component: ProductItemComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}