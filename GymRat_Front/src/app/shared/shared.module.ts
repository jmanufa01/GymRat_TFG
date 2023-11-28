import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReplacePipe } from './pipes/replace.pipe';
import { DropdownComponent } from './components/dropdown/dropdown.component';

@NgModule({
  declarations: [
    ErrorPageComponent,
    InputComponent,
    ButtonComponent,
    NavBarComponent,
    LoadingComponent,
    DropdownComponent,
    ReplacePipe,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  exports: [
    InputComponent,
    ButtonComponent,
    LoadingComponent,
    NavBarComponent,
    ReactiveFormsModule,
    FormsModule,
    DropdownComponent,
  ],
})
export class SharedModule {}
