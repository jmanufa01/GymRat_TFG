import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Difficulty } from 'src/app/main/routines/interfaces';
import { AuthService } from '../../services/auth.service';

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
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    birthDate: [Validators.required],
    height: [0.0],
    weight: [0.0],
    gymExperience: [''],
  });

  public passwordError: boolean = false;
  public error: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  validatePasswords(): boolean {
    return (
      this.registerForm.get('password')?.value ===
      this.registerForm.get('confirmPassword')?.value
    );
  }

  register(): void {
    if (!this.validatePasswords()) {
      this.passwordError = true;
      return;
    }

    if (this.registerForm.invalid) {
      this.error = true;
      return;
    }

    this.authService.register(this.registerForm).subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: (err) => () => {
        this.error = true;
        return throwError(() => err);
      },
    });
  }
}
