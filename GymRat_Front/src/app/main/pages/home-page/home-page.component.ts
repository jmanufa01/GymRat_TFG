import { Component, computed } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  constructor(private authService: AuthService) {}

  public user = computed(() => this.authService.currentUser());
}
