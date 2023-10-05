import { Component, computed, effect } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}

  public isAuthenticationFinished(): boolean {
    return this.authService.authStatus() !== AuthStatus.Checking;
  }

  public authStatusEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.Authenticated || AuthStatus.Checking:
        return;
      case AuthStatus.NotAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;
    }
  });
}
