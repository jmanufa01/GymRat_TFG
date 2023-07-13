import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { FormComponent } from './components/form/form.component';
import { InputComponent } from './components/input/input.component';

@NgModule({
  declarations: [ErrorPageComponent, FormComponent, InputComponent],
  imports: [CommonModule],
  exports: [FormComponent, InputComponent],
})
export class SharedModule {}
