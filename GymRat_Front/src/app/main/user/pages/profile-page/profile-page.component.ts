import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../user.service';
import { Profile } from '../../interfaces/profile.interface';
import { MatDialog } from '@angular/material/dialog';
import { FriendsModalComponent } from '../../components/friends-modal/friends-modal/friends-modal.component';

@Component({
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent {
  constructor(private dialog: MatDialog, private userService: UserService) {
    this.userService.getProfile().subscribe((res) => {
      this.profile = res;
      console.log(this.profile);
    });
  }
  @ViewChild('imgRef', { static: true })
  public el!: ElementRef;

  public profile: Profile = {
    userName: '',
    email: '',
    birthDate: '',
    gymExperience: '',
    weight: 0,
    height: 0,
  };

  public hints = ['pedro', 'pablo', 'juan'];

  public onAddUserClick(): void {
    console.log('click');
    this.dialog.open(FriendsModalComponent, {
      width: '30%',
      height: '50%',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
      autoFocus: true,
      panelClass: 'modal',
      data: {},
    });
  }
}
