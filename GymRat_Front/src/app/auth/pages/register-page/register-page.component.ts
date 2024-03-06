import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Difficulty } from 'src/app/main/routines/interfaces';
import { throwError } from 'rxjs';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
    `
      .login-bg-image {
        background-image: url('/assets/login-bg-violet.png');
        background-size: 100% 100%;
      }
    `,
  ],
})
export class RegisterPageComponent {
  public difficulties = Object.values(Difficulty);

  //TODO: Add validators
  public registerForm = this.fb.group({
    username: [''],
    password: [''],
    email: [''],
    birthDate: [],
    height: [0.0],
    weight: [0.0],
    gymExperience: [''],
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  register(): void {
    this.authService.register(this.registerForm).subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: (err) => throwError(() => err),
    });
  }
}
