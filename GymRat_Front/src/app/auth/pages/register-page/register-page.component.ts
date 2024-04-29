import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Difficulty } from 'src/app/main/routines/interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
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

  public errorMessage: string = '';
  public passwordError: boolean = false;
  public emailError: boolean = false;
  public error: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  onEmailChange(): void {
    if (this.registerForm['controls'].email.errors) {
      this.emailError = true;
      this.error = true;
      this.errorMessage = 'Invalid email';
    } else {
      this.emailError = false;
      this.error = false;
    }
  }

  onConfirmPasswordChange(confirmPassword: string): void {
    if (this.registerForm.value.password !== confirmPassword) {
      this.passwordError = true;
      this.error = true;
      this.errorMessage = 'Passwords do not match';
    } else {
      this.passwordError = false;
      this.error = false;
    }
  }

  register(): void {
    if (this.registerForm.invalid || this.passwordError) {
      this.error = true;
      this.errorMessage = 'All fields are required';
      return;
    }

    this.authService.register(this.registerForm).subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: (err) => () => {
        this.error = true;
        this.errorMessage = err.error.message;
        return throwError(() => err);
      },
    });
  }
}
