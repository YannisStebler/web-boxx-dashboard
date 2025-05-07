import { Routes } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { authGuard } from './services/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'impressum',
    loadComponent: () => import('./views/pages/legal/impressum/impressum.component').then(c => c.ImpressumComponent)
  },
  {
    path: 'agb',
    loadComponent: () => import('./views/pages/legal/agb/agb.component').then(c => c.AgbComponent)
  },
  {
    path: 'data-protection-law',
    loadComponent: () => import('./views/pages/legal/data-protection-law/data-protection-law.component').then(c => c.DataProtectionLawComponent)
  },
  { path: 'auth', loadChildren: () => import('./views/pages/auth/auth.routes')},
  {
    path: '',
    component: BaseComponent,
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('./views/pages/home/home.component').then(c => c.HomeComponent),
        canActivate: [authGuard]
      },
      {
        path: 'sales-report',
        loadComponent: () => import('./views/pages/sales/sales.component').then(c => c.SalesComponent),
        canActivate: [authGuard]
      },
      {
        path: 'order-history',
        loadComponent: () => import('./views/pages/order-history/order-history.component').then(c => c.OrderHistoryComponent),
        canActivate: [authGuard]
      },
      {
        path: 'active-orders',
        loadComponent: () => import('./views/pages/active-orders/active-orders.component').then(c => c.ActiveOrdersComponent),
        canActivate: [authGuard]
      },
      {
        path: 'manage-products',
        loadComponent: () => import('./views/pages/products-managment/products-managment.component').then(c => c.ProductsManagmentComponent),
        canActivate: [authGuard]
      },
      {
        path: 'cash-register',
        loadComponent: () => import('./views/pages/checkout/checkout.component').then(c => c.CheckoutComponent),
        canActivate: [authGuard]
      },
    ]
  },
  {
    path: 'error',
    loadComponent: () => import('./views/pages/error/error.component').then(c => c.ErrorComponent),
  },
  {
    path: 'error/:type',
    loadComponent: () => import('./views/pages/error/error.component').then(c => c.ErrorComponent)
  }
];
