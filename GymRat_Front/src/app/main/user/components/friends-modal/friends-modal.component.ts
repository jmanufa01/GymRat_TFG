import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'user-friends-modal',
  templateUrl: './friends-modal.component.html',
  styleUrls: ['./friends-modal.component.css'],
})
export class FriendsModalComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject();
  private debouncerSubscription?: Subscription;
  public friendsUsernames: { username: string }[] = [];
  public filteredUsernames: { username: string }[] = [];
  public friendsView: boolean = true;
  public searchTerm: string = '';

  constructor(
    public dialogRef: MatDialogRef<FriendsModalComponent>,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  public closeModal(): void {
    this.dialogRef.close();
  }

  public onDeleteSearchTermClick(): void {
    this.searchTerm = '';
    this.searchFriends('');
  }

  public onKeyPress(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.debouncer.next(searchTerm);
  }

  public onAddFriendClick(friendUserName: string): void {
    this.notificationService
      .sendFriendRequest(friendUserName)
      .subscribe((res) => {
        this.filteredUsernames = this.filteredUsernames.filter(
          (username) => username.username !== friendUserName
        );
        this.obtainFriends();
      });
  }

  public onDeleteFriendClick(friendUserName: string): void {
    this.userService.deleteFriend(friendUserName).subscribe((res) => {
      this.friendsUsernames = this.friendsUsernames.filter(
        (username) => username.username !== friendUserName
      );
      this.searchFriends('');
    });
  }

  public onChangeViewClick(): void {
    this.friendsView = !this.friendsView;
  }

  private obtainFriends(): void {
    this.friendsUsernames = [];
    this.userService.getFriendsUsernames().subscribe((res) => {
      this.friendsUsernames = res;
    });
  }

  private searchFriends(searchTerm: string): void {
    this.filteredUsernames = [];
    this.userService.getUsersByUserName(searchTerm).subscribe((res) => {
      this.filteredUsernames = res;
    });
  }

  ngOnInit(): void {
    this.obtainFriends();
    this.searchFriends('');
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(200))
      .subscribe((value) => {
        this.searchFriends(value);
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }
}
