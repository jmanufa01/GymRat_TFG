import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutinesRoutingModule } from './routines-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../../shared/shared.module';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [HomePageComponent, CalendarPageComponent],
  imports: [
    CommonModule,
    RoutinesRoutingModule,
    SharedModule,
    FullCalendarModule,
  ],
})
export class RoutinesModule {}
