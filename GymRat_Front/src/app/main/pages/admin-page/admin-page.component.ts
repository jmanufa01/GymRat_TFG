import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AdminService } from '../../services/admin.service';

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
  public loading: boolean = false;
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
    this.loading = true;
    this.adminService.getUsers().subscribe((users) => {
      this.fillUsers(users);
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.findUsers();

    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(200))
      .subscribe((searchTerm) => {
        this.loading = true;
        if (searchTerm === '') {
          this.findUsers();
          return;
        }
        this.adminService.getUsersByUsername(searchTerm).subscribe((users) => {
          this.fillUsers(users);
          this.loading = false;
        });
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }
}
