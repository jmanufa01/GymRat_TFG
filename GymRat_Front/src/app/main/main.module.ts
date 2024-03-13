import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

@NgModule({
  declarations: [HomePageComponent, AdminPageComponent, MainLayoutComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule, MatDialogModule],
})
export class MainModule {}
