import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ErrorPageComponent,
    InputComponent,
    ButtonComponent,
    NavBarComponent,
    LoadingComponent,
    ModalComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatDialogModule],
  exports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    LoadingComponent,
    NavBarComponent,
    ModalComponent,
  ],
})
export class SharedModule {}
