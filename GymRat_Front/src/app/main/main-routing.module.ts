import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdminGuard } from '../auth/guards';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: 'admin',
        canActivate: [AdminGuard],
        component: AdminPageComponent,
      },
      {
        path: 'routines',
        loadChildren: () =>
          import('./routines/routines.module').then((m) => m.RoutinesModule),
      },
      {
        path: 'progress',
        loadChildren: () =>
          import('./progress/progress.module').then((m) => m.ProgressModule),
      },
      {
        path: ':user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: '**',
        redirectTo: 'routines',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
