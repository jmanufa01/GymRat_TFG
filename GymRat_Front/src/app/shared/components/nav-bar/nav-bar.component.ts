import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Notification } from 'src/app/main/user/interfaces';
import { NotificationService } from 'src/app/main/user/services/notification.service';

@Component({
  selector: 'shared-nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent implements OnInit {
  public isNotificationsDropdownOpen = false;

  public notifications: Notification[] = [];

  @ViewChild('notificationsIcon')
  public notificationsIconRef!: ElementRef;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  get userName(): string {
    return this.authService.currentUser()!.username;
  }

  logout() {
    this.authService.logout();
  }

  public onOpenCloseDropdown(): void {
    this.isNotificationsDropdownOpen = !this.isNotificationsDropdownOpen;
  }

  public onCloseDropdown(): void {
    this.isNotificationsDropdownOpen = false;
  }

  handleAcceptFriendRequest(notification: Notification): void {
    this.notificationService
      .acceptFriendRequest(notification)
      .subscribe((res) => {
        this.notifications = this.notifications.filter(
          (n) => n.id !== notification.id
        );
      });
  }

  handleRejectFriendRequest(notification: Notification): void {
    this.notificationService.rejectFriendRequest(notification).subscribe();
  }

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe((res) => {
      this.notifications = res;
    });
  }
}
