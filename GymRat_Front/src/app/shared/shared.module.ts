import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ErrorPageComponent,
    InputComponent,
    ButtonComponent,
    NavBarComponent,
    LoadingComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    LoadingComponent,
    NavBarComponent,
  ],
})
export class SharedModule {}
