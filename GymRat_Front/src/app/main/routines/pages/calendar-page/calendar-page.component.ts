import { TitleCasePipe } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { throwError } from 'rxjs';
import { ModalComponent } from '../../components/modal/modal.component';
import { Routine } from '../../interfaces';
import { RoutinesService } from '../../services/routines.service';

@Component({
  templateUrl: './calendar-page.component.html',
})
export class CalendarPageComponent implements AfterViewInit {
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
        this.reloadCalendar(arg.date);
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
        this.reloadCalendar(arg.event.start!);
      });
  }

  fillEvents(routines: Routine[]): void {
    routines.forEach((routine) => {
      const routineColorInLocalStorage = localStorage.getItem(routine.id!);
      let color = this.getRandomColor();

      if (routineColorInLocalStorage) {
        color = routineColorInLocalStorage;
      } else {
        localStorage.setItem(routine.id!, color);
      }

      this.events.push({
        title: routine.muscularGroup
          .map((exercise) => new TitleCasePipe().transform(exercise))
          .join(', ')
          .replace('_', ' '),
        start: new Date(routine.realizationDate).toISOString(),
        color,
      });
    });
  }

  reloadCalendar(calendarDate: Date): void {
    this.date = calendarDate;
    this.loadingCalendar = true;
    this.events = [];
    this.routineService.getRoutinesByDate(calendarDate).subscribe({
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
        throwError(() => err);
        this.loadingCalendar = false;
      },
    });
  }

  loadCalendar(): void {
    const calendarDate = this.calendarComponent.getApi().getDate();
    if (calendarDate.getMonth() !== this.date.getMonth()) {
      this.reloadCalendar(calendarDate);
    }
  }

  ngAfterViewInit(): void {
    this.loadCalendar();
  }
}
