import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  public myForm = this.fb.group({
    username: [''],
    password: [''],
  });

  public error: boolean = false;

  login(): void {
    const { username, password } = this.myForm.value;

    this.authService.login(username!, password!).subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: (err) => (this.error = true),
    });
  }
}
