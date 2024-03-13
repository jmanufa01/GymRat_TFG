import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
})
export class AdminPageComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) {}

  public users: User[] = [];

  onDeleteUserClick(username: string): void {
    this.adminService.deleteUser(username).subscribe(() => {
      this.users = this.users.filter((user) => user.username !== username);
    });
  }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe((users) => {
      this.users = users;
      this.users = this.users.filter(
        (user) => user.username !== this.authService.currentUser()!.username
      );
    });
  }
}
