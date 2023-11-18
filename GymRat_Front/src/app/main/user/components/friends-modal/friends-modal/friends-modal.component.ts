import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { UserService } from '../../../user.service';

@Component({
  selector: 'user-friends-modal',
  templateUrl: './friends-modal.component.html',
})
export class FriendsModalComponent implements OnInit, OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<FriendsModalComponent>,
    private userService: UserService
  ) {}

  private debouncer: Subject<string> = new Subject();
  private debouncerSubscription?: Subscription;
  public filteredUsernames: { username: string }[] = [];

  public closeModal(): void {
    this.dialogRef.close();
  }

  onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(500))
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
