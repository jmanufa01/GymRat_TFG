import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ExerciseComponent } from './components/exercise/exercise.component';

@NgModule({
  declarations: [
    ErrorPageComponent,
    InputComponent,
    ButtonComponent,
    NavBarComponent,
    LoadingComponent,
    ModalComponent,
    ExerciseComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    MatCheckboxModule,
  ],
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
