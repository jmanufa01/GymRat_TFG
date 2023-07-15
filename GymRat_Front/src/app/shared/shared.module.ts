import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { FormComponent } from './components/form/form.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ErrorPageComponent,
    FormComponent,
    InputComponent,
    ButtonComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FormComponent, InputComponent, ButtonComponent],
})
export class SharedModule {}
