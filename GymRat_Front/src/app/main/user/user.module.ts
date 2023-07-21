import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
