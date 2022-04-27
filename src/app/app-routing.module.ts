import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [

  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
  },

  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },

  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },

  { path: 'shop',
   loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopModule),
   canActivate: [AuthGuard]
  },

  { path: 'cart',
   loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule),
   canActivate: [AuthGuard]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
