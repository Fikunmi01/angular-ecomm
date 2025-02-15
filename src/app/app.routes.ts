import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ProductItemComponent } from './pages/product-item/product-item.component';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryItemComponent } from './pages/category-item/category-item.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { VerifyComponent } from './components/login/verify/verify.component';
import { LoginComponent } from './components/login/login.component';
import { SellerVerificationComponent } from './components/seller-verification/seller-verification.component';

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
  // {
  //   path: 'item/one',
  //   component: ProductItemComponent,
  //   pathMatch: 'full',
  // },
  {
    path: 'item/:id',
    component: ProductItemComponent,
    pathMatch: 'full',
  },
  {
    path: 'category',
    component: CategoryComponent,
    pathMatch: 'full',
  },

  {
    path: 'category/:name',
    component: CategoryItemComponent,
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup/verify',
    component: VerifyComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'seller-verification',
    component: SellerVerificationComponent,
    pathMatch: 'full',
  },
];
