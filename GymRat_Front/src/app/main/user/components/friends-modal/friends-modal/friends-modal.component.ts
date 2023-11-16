import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'user-friends-modal',
  templateUrl: './friends-modal.component.html',
})
export class FriendsModalComponent implements OnInit, OnDestroy {
  constructor(public dialogRef: MatDialogRef<FriendsModalComponent>) {}

  private debouncer: Subject<string> = new Subject();
  private debouncerSubscription?: Subscription;

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
        console.log(value);
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }
}
