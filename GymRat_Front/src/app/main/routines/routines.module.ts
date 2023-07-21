import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutinesRoutingModule } from './routines-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, RoutinesRoutingModule, SharedModule],
})
export class RoutinesModule {}
