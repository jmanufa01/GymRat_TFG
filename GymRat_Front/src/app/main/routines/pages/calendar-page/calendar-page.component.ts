import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { ModalComponent } from '../../components/modal/modal.component';
import { RoutinesService } from '../../services/routines.service';
import { Routine } from '../../interfaces';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { TitleCasePipe } from '@angular/common';
import { preventDefault } from '@fullcalendar/core/internal';

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
    color: string;
  }[] = [];

  private routines: Routine[] = [];

  @ViewChild('fullCalendar', { read: FullCalendarComponent })
  public calendarComponent!: FullCalendarComponent;

  public calendarOptions: CalendarOptions;

  private date: Date = new Date();

  public loadingCalendar = false;

  private getRandomColor(): string {
    const r = Math.floor(Math.random() * 256); // Valor entre 0 y 255
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Convertir los valores a formato hexadecimal y concatenar
    const colorHex = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

    return colorHex;
  }

  public onDateClick(arg: DateClickArg): void {
    this.dialog
      .open(ModalComponent, {
        id: 'modal',
        width: '60%',
        height: '70%',
        enterAnimationDuration: '200ms',
        exitAnimationDuration: '200ms',
        autoFocus: true,
        panelClass: 'modal',
        data: {
          date: arg.date,
          routines: this.routines.filter(
            (routine) =>
              new Date(routine.realizationDate).toISOString() ===
              arg.date?.toISOString()
          ),
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.events = [];
        this.loadCalendar();
      });
  }

  public onEventClick(arg: EventClickArg): void {
    this.dialog
      .open(ModalComponent, {
        width: '60%',
        height: '70%',
        enterAnimationDuration: '200ms',
        exitAnimationDuration: '200ms',
        autoFocus: true,
        panelClass: 'modal',
        data: {
          date: arg.event.start,
          routines: this.routines.filter(
            (routine) =>
              new Date(routine.realizationDate).toISOString() ===
              arg.event.start?.toISOString()
          ),
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.events = [];
        this.loadCalendar();
      });
  }

  fillEvents(routines: Routine[]): void {
    routines.forEach((routine) => {
      this.events.push({
        title: routine.muscularGroup
          .map((exercise) => new TitleCasePipe().transform(exercise))
          .join(', ')
          .replace('_', ' '),
        start: new Date(routine.realizationDate).toISOString(),
        color: this.getRandomColor(),
      });
    });
  }

  loadCalendar(): void {
    const calendarDate = this.calendarComponent.getApi().getDate();
    if (
      this.events.length < 1 ||
      calendarDate.getMonth() !== this.date.getMonth()
    ) {
      this.date = calendarDate;
      this.loadingCalendar = true;
      this.events = [];
      this.routineService.getRoutines(calendarDate).subscribe({
        next: (res) => {
          this.fillEvents(res);
          this.routines = res;
          this.calendarOptions = {
            ...this.calendarOptions,
            events: this.events,
          };
          this.loadingCalendar = false;
          setTimeout(() => {
            this.calendarComponent.getApi().gotoDate(this.date);
          }, 0);
        },
        error: (err) => {
          console.log(err);
          this.loadingCalendar = false;
        },
      });
    }
  }

  ngAfterViewInit(): void {
    this.loadCalendar();
  }
}
