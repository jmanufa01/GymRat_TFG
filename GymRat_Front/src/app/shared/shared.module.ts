import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { FormComponent } from './components/form/form.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    ErrorPageComponent,
    FormComponent,
    InputComponent,
    ButtonComponent,
  ],
  imports: [CommonModule],
  exports: [FormComponent, InputComponent, ButtonComponent],
})
export class SharedModule {}
