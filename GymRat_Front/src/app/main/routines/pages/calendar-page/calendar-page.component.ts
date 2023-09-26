import { AfterViewInit, Component, ViewChild, effect } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import Swal from 'sweetalert2';
import { ModalComponent } from '../../components/modal/modal.component';
import { RoutinesService } from '../../services/routines.service';
import { Routine } from '../../interfaces';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  templateUrl: './calendar-page.component.html',
})
export class CalendarPageComponent implements AfterViewInit {
  constructor(
    private dialog: MatDialog,
    private routineService: RoutinesService
  ) {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      dateClick: this.onDateClick.bind(this),
      eventClick: this.onEventClick.bind(this),
      showNonCurrentDates: false,
      eventDisplay: 'list-item',
      weekNumberCalculation: 'ISO',
      displayEventTime: false,
    };
  }
  private events: {
    title: string;
    start: string;
  }[] = [];
  @ViewChild('fullCalendar', { read: FullCalendarComponent })
  public calendarComponent!: FullCalendarComponent;

  public calendarOptions: CalendarOptions;

  private date: Date = new Date();

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

  onClick(): void {
    console.log('clicked');
  }

  fillEvents(routines: Routine[]): void {
    routines.forEach((routine) => {
      this.events.push({
        title: routine.muscularGroup.join(', '),
        start: new Date(routine.realizationDate).toISOString(),
      });
    });
  }

  loadCalendar(): void {
    const calendarDate = this.calendarComponent.getApi().getDate();
    if (
      this.events.length < 1 ||
      calendarDate.getMonth() !== this.date.getMonth()
    ) {
      this.events = [];
      this.date = calendarDate;
      this.routineService
        .getRoutines(this.calendarComponent.getApi().getDate())
        .subscribe({
          next: (res) => {
            this.fillEvents(res);
            this.calendarOptions = {
              ...this.calendarOptions,
              events: this.events,
            };
            console.log(this.calendarOptions.events);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  ngAfterViewInit(): void {
    this.dialog.afterAllClosed.subscribe(() => {
      this.events = [];
      this.loadCalendar();
    });
  }
}
