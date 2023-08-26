import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutinesRoutingModule } from './routines-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalComponent } from './components/modal/modal.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { SupersetComponent } from './components/superset/superset.component';

@NgModule({
  declarations: [
    CalendarPageComponent,
    ModalComponent,
    ExerciseComponent,
    SupersetComponent,
  ],
  imports: [
    CommonModule,
    RoutinesRoutingModule,
    SharedModule,
    FullCalendarModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
})
export class RoutinesModule {}
