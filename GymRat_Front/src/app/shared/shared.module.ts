import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { FormComponent } from './components/form/form.component';
import { InputComponent } from './components/input/input.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    ErrorPageComponent,
    FormComponent,
    InputComponent,
    FormFieldComponent,
    ButtonComponent,
  ],
  imports: [CommonModule],
  exports: [FormComponent, InputComponent, FormFieldComponent, ButtonComponent],
})
export class SharedModule {}
