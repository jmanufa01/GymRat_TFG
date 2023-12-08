import { Component, computed } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  public user = computed(() => this.authService.currentUser());

  constructor(private authService: AuthService) {}
}
