import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { InputComponent } from './components/input/input.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { ReplacePipe } from './pipes/replace.pipe';

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
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatBadgeModule,
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    LoadingComponent,
    NavBarComponent,
    ReactiveFormsModule,
    FormsModule,
    DropdownComponent,
    ReplacePipe,
  ],
})
export class SharedModule {}
