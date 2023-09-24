import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import Swal from 'sweetalert2';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  templateUrl: './calendar-page.component.html',
})
export class CalendarPageComponent {
  constructor(private dialog: MatDialog) {}

  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: this.onDateClick.bind(this),
    eventClick: this.onEventClick.bind(this),
    showNonCurrentDates: false,
    eventDisplay: 'list-item',
    weekNumberCalculation: 'ISO',
    displayEventTime: false,
    events: [
      {
        title: 'Leg',
        start: '2023-09-23',
      },
      {
        title: 'Back',
        start: new Date(),
      },
    ],
  };
  public event: MouseEvent = new MouseEvent('click');

  public onDateClick(arg: DateClickArg): void {
    if (arg.date > new Date()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You cannot create a routine in the future!',
      });
      return;
    }

    this.dialog.open(ModalComponent, {
      width: '60%',
      height: '70%',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
      autoFocus: true,
      panelClass: 'modal',
      data: {
        date: arg.date,
      },
    });
  }

  public onEventClick(arg: EventClickArg): void {
    this.dialog.open(ModalComponent, {
      width: '60%',
      height: '70%',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
      autoFocus: true,
      panelClass: 'modal',
      data: {
        date: arg.event.start,
      },
    });
  }

  OnClick(event: MouseEvent): void {
    this.event = event;
  }
}
