import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { MainRoutingModule } from './main-routing.module';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [HomePageComponent, AdminPageComponent, MainLayoutComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule, MatDialogModule],
})
export class MainModule {}
