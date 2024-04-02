import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { EventClickArg } from '@fullcalendar/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
})
export class AdminPageComponent implements OnInit, OnDestroy {
  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) {}

  public users: User[] = [];
  public searchTerm: string = '';
  private debouncer: Subject<string> = new Subject();
  private debouncerSubscription?: Subscription;

  onDeleteUserClick(username: string): void {
    this.adminService.deleteUser(username).subscribe(() => {
      this.users = this.users.filter((user) => user.username !== username);
    });
  }

  onKeyPress(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.debouncer.next(searchTerm);
  }

  onDeleteSearchTermClick(): void {
    this.searchTerm = '';
    this.findUsers();
  }

  fillUsers(users: User[]): void {
    this.users = users;
    this.users = this.users.filter(
      (user) => user.username !== this.authService.currentUser()!.username
    );
  }

  findUsers(): void {
    this.adminService.getUsers().subscribe((users) => {
      this.fillUsers(users);
    });
  }

  ngOnInit(): void {
    this.findUsers();

    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(200))
      .subscribe((searchTerm) => {
        this.adminService.getUsersByUsername(searchTerm).subscribe((users) => {
          console.log(users);
          this.fillUsers(users);
        });
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }
}
