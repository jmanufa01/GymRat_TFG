import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateGuard, PublicGuard } from './auth/guards';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [PublicGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    canActivate: [PrivateGuard],
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
