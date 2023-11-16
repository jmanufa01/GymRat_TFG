import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FriendsModalComponent } from './components/friends-modal/friends-modal/friends-modal.component';

@NgModule({
  declarations: [ProfilePageComponent, FriendsModalComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
