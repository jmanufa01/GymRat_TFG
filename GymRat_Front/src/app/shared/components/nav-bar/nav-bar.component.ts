import { Component, computed, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Notification } from 'src/app/main/user/interfaces';
import { NotificationService } from 'src/app/main/user/services/notification.service';

@Component({
  selector: 'shared-nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  public isNotificationsOpen = false;

  public notifications: Notification[] = [];

  get userName(): string {
    return this.authService.currentUser()!.username;
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe((res) => {
      this.notifications = res;
    });
  }
}
