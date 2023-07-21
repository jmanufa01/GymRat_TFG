import { Component, computed } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'shared-nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  constructor(private authService: AuthService) {}

  get userName(): string {
    return this.authService.currentUser()!.username;
  }

  logout() {
    this.authService.logout();
  }
}
