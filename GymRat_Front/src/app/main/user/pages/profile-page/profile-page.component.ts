import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { Profile } from '../../interfaces/profile.interface';

@Component({
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent {
  constructor(private userService: UserService) {
    this.userService.getProfile().subscribe((res) => {
      this.profile = res;
      console.log(this.profile);
    });
  }

  public profile: Profile = {
    userName: '',
    email: '',
    birthDate: '',
    gymExperience: '',
    weight: 0,
    height: 0,
  };
}
