import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'user-friends-modal',
  templateUrl: './friends-modal.component.html',
})
export class FriendsModalComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject();
  private debouncerSubscription?: Subscription;
  public filteredUsernames: { username: string }[] = [];

  constructor(
    public dialogRef: MatDialogRef<FriendsModalComponent>,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  public closeModal(): void {
    this.dialogRef.close();
  }

  onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }

  onAddFriendClick(friendUserName: string): void {
    this.notificationService
      .sendFriendRequest(friendUserName)
      .subscribe((res) => {
        this.filteredUsernames = this.filteredUsernames.filter(
          (username) => username.username !== friendUserName
        );
      });
  }

  ngOnInit(): void {
    this.userService.getUsersByUserName('').subscribe((res) => {
      this.filteredUsernames = res;
    });
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(200))
      .subscribe((value) => {
        this.userService.getUsersByUserName(value).subscribe((res) => {
          this.filteredUsernames = res;
        });
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }
}
