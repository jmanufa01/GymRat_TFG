import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStatus } from './auth/interfaces';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
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
