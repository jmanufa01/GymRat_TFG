import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Notification } from 'src/app/main/user/interfaces';
import { NotificationService } from 'src/app/main/user/services/notification.service';

@Component({
  selector: 'shared-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, AfterViewInit {
  public isNotificationsDropdownOpen = false;

  public notifications: Notification[] = [];

  @ViewChild('notificationsIcon')
  public notificationsIconRef!: ElementRef;

  @ViewChild('menuIcon')
  public menuIconRef!: ElementRef;

  @ViewChild('navBarLeft')
  public navBarLeftRef!: ElementRef;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  get userName(): string {
    return this.authService.currentUser()!.username;
  }

  get role(): string {
    return this.authService.currentUser()!.role;
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

  onShowMenu(): void {
    let navBarLeft = document.getElementById('nav-bar-left');
    navBarLeft!.style.display = 'flex';
    navBarLeft?.classList.add('show-menu');
  }

  onHideMenu(): void {
    let navBarLeft = document.getElementById('nav-bar-left');
    navBarLeft?.classList.remove('show-menu');
  }

  handleRejectFriendRequest(notification: Notification): void {
    this.notificationService.rejectFriendRequest(notification).subscribe();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    if (
      this.navBarLeftRef.nativeElement &&
      this.menuIconRef.nativeElement &&
      !this.menuIconRef.nativeElement.contains(event.target as Node) &&
      !this.navBarLeftRef.nativeElement.contains(event.target as Node)
    ) {
      this.onHideMenu();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleEscape(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.onHideMenu();
    }
  }

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe((res) => {
      this.notifications = res;
    });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
