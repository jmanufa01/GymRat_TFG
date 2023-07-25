import { Component, OnChanges, SimpleChanges, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
      next: () => this.router.navigateByUrl('/routines/home'),
      error: (err) => {
        console.log({ err });
        this.error = true;
      },
    });
  }
}
