import { Component, OnChanges, effect, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/core';
import { F } from '@fullcalendar/core/internal-common';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { ar, es, zhCN } from 'date-fns/locale';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

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
  };
  public event: MouseEvent = new MouseEvent('click');

  onDateClick(arg: DateClickArg): void {
    if (arg.date > new Date()) {
      return;
    }
    console.log(this.event.clientX, this.event.clientY);

    this.dialog.open(ModalComponent, {
      width: '60%',
      height: '70%',
      enterAnimationDuration: '200ms',
      autoFocus: true,
      panelClass: 'modal',
    });

    this.dialog.afterAllClosed.subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  OnClick(event: MouseEvent): void {
    this.event = event;
  }
}
