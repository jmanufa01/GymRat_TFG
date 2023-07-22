import { Component } from '@angular/core';

@Component({
  templateUrl: './calendar-page.component.html',
})
export class CalendarPageComponent {
  public viewDate: Date = new Date();
}
