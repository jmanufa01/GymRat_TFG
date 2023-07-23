import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

@Component({
  templateUrl: './calendar-page.component.html',
})
export class CalendarPageComponent {
  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: this.onDateClick,
  };

  onDateClick(arg: DateClickArg): void {
    if (arg.date > new Date()) {
      return;
    }

    alert('date click! ' + arg.dateStr);
  }
}
