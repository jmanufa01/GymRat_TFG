import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Profile } from '../../interfaces/profile.interface';
import { MatDialog } from '@angular/material/dialog';
import { FriendsModalComponent } from '../../components/friends-modal/friends-modal.component';

@Component({
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent {
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

  constructor(private dialog: MatDialog, private userService: UserService) {
    this.userService.getProfile().subscribe((res) => {
      this.profile = res;
    });
  }

  public onAddUserClick(): void {
    this.dialog.open(FriendsModalComponent, {
      panelClass: 'friends-modal',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
      autoFocus: true,
      data: {},
    });
  }
}
