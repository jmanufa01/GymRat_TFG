import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import Swal from 'sweetalert2';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  templateUrl: './calendar-page.component.html',
})
export class CalendarPageComponent {
  constructor(private dialog: MatDialog) {}

  public formActive: boolean = false;
  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: this.onDateClick.bind(this),
    weekNumberCalculation: 'ISO',
  };
  public event: MouseEvent = new MouseEvent('click');

  onDateClick(arg: DateClickArg): void {
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
      autoFocus: true,
      panelClass: 'modal',
      data: {
        date: arg.date,
        routines: [],
      },
    });
  }

  OnClick(event: MouseEvent): void {
    this.event = event;
  }
}
