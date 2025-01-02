import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ProductItemComponent } from './pages/product-item/product-item.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   component: ProductListComponent,
  // },
  {
    path: '',
    pathMatch: 'full',
    component: HomepageComponent,
  },
  {
    path: 'cart',
    pathMatch: 'full',
    component: CartComponent,
  },

  {
    path: 'cart/order-summary',
    pathMatch: 'full',
    component: OrderSummaryComponent,
  },

  {
    path: 'about-us',
    component: AboutUsComponent,
    pathMatch: 'full',
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    pathMatch: 'full',
  },
  {
    path: 'item/one',
    component: ProductItemComponent,
    pathMatch: 'full',
  },
  {
    path: 'item/:id',
    component: ProductItemComponent,
    pathMatch: 'full',
  },
];
