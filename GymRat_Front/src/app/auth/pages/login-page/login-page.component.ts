import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  public myForm: FormGroup = this.formBuilder.group({
    username: [''],
    password: [''],
  });

  login(): void {
    console.log('LOGIN STATRTED');

    const { username, password } = this.myForm.value;

    this.authService
      .login(username, password)
      .subscribe((success) => console.log('success'));
  }
}
