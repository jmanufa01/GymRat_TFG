import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [HomePageComponent, MainLayoutComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
