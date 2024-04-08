import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTheme,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
} from 'ng-apexcharts';
import { Subject, Subscription, debounceTime } from 'rxjs';
import {
  FilterForm,
  FilterType,
} from 'src/app/main/progress/interfaces/filters.interface';
import {
  Muscle,
  Routine,
  SimpleExercise,
} from 'src/app/main/routines/interfaces';
import { ExercisesService } from 'src/app/main/routines/services/exercises.service';
import { RoutinesService } from '../../../routines/services/routines.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  theme: ApexTheme;
};

@Component({
  selector: 'progress-page',
  templateUrl: './progress-page.component.html',
})
export class ProgressPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  public muscles = Object.values(Muscle);

  public filters = Object.values(FilterType);

  public filterForm: FormGroup<FilterForm> = this.fb.group({
    filter: [FilterType.BY_MUSCLE],
    value: [this.muscles[0].toString()],
  });

  @ViewChild('searchDivRef')
  public searchRef!: ElementRef;
  public isExerciseSearchOpen: boolean = false;
  public filteredExercises: SimpleExercise[] = [];

  private debouncer: Subject<string> = new Subject();
  private debouncerSubscription?: Subscription;
  private data: { x: string; y: number }[] = [];
  private dates: string[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private routineService: RoutinesService,
    private exercisesService: ExercisesService,
    private fb: FormBuilder
  ) {
    this.onMuscleSelect(this.muscles[0].toString());

    this.chartOptions = {
      series: [
        {
          name: 'series-1',
          data: this.data,
        },
      ],
      chart: {
        width: '100%',
        height: 350,
        type: 'line',
      },
      title: {
        text: 'Progress',
      },
      xaxis: {
        type: 'datetime',
        title: {
          text: 'Date',
        },
      },
      yaxis: {
        title: {
          text: 'Weight',
        },
      },
      theme: {
        mode: 'light',
        palette: 'palette10',
      },
    };
  }

  private addData(simpleExercise: SimpleExercise, date: Date) {
    this.dates.push(date.toISOString());
    this.data.push({
      x: `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} GMT`,
      y: Math.max(...simpleExercise.weights!),
    });
  }

  private chooseHigherWeight(simpleExercise: SimpleExercise, date: Date): void {
    const formatedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} GMT`;

    this.data = this.data.map((data) => {
      if (data.x === formatedDate) {
        return {
          ...data,
          y: Math.max(data.y, Math.max(...simpleExercise.weights!)),
        };
      }
      return data;
    });
  }

  private fillData(res: Routine[], filterValue: string): void {
    this.data = [];
    this.dates = [];
    if (res.length > 0) {
      res.sort((a, b) => {
        return (
          new Date(b.realizationDate).getTime() -
          new Date(a.realizationDate).getTime()
        );
      });
      console.log(res);
      res.forEach((routine) => {
        routine.exercises.forEach((exercise) => {
          let simpleExercise: SimpleExercise = exercise as SimpleExercise;
          if (simpleExercise.series) {
            let date: Date = new Date(routine.realizationDate);

            console.log('date:', date);
            console.log('this.dates:', this.dates);

            this.dates.includes(date.toISOString())
              ? this.chooseHigherWeight(simpleExercise, date)
              : this.addData(simpleExercise, date);
          }
          this.chart.updateSeries([
            {
              name: filterValue,
              data: this.data,
            },
          ]);
        });
      });
    } else {
      this.chart.updateSeries([
        {
          name: filterValue,
          data: this.data,
        },
      ]);
    }
  }

  onMuscleSelect(muscle: string): void {
    this.routineService.getRoutinesByMuscle(muscle).subscribe((res) => {
      this.fillData(res, muscle);
    });
  }

  onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }

  onCloseDropdown(): void {
    this.isExerciseSearchOpen = false;
  }

  onFilteredExerciseClick(exercise: SimpleExercise): void {
    this.routineService
      .getRoutinesByExerciseName(exercise.name)
      .subscribe((res) => {
        this.fillData(res, exercise.name);
      });
  }

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(200))
      .subscribe((value) => {
        this.exercisesService
          .findExercisesContainedInAnyRoutine(value)
          .subscribe((res) => {
            this.filteredExercises = res;
          });
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
