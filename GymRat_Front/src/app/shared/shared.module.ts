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
import { FormatListPipe } from './pipes/formatList.pipe';
import { ReplacePipe } from './pipes/replace.pipe';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    NavBarComponent,
    LoadingComponent,
    DropdownComponent,
    ReplacePipe,
    FormatListPipe,
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
    FormatListPipe,
  ],
})
export class SharedModule {}
