import { Component, OnChanges, SimpleChanges, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './login-page.component.html',
  styles: [
    `
      .login-bg-image {
        background-image: url('/assets/login-bg-violet.png');
        background-size: 100% 100%;
      }
    `,
  ],
})
export class LoginPageComponent {
  private fb: FormBuilder = inject(FormBuilder);

  public myForm = this.fb.group({
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(private authService: AuthService) {}

  login(): void {
    console.log('LOGIN STATRTED');

    const { username, password } = this.myForm.value;

    this.authService
      .login(username, password)
      .subscribe((success) => console.log('success'));
  }
}
