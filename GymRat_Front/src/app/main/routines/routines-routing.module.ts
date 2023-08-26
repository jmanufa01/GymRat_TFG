import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarPageComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutinesRoutingModule {}
