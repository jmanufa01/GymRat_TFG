import { animate, style, transition, trigger } from '@angular/animations';
import { TitleCasePipe } from '@angular/common';
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
  Superset,
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
  animations: [
    trigger('fadeInFromTop', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-16px)' }),
        animate(
          '500ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('fadeOutToTop', [
      transition(':leave', [
        animate(
          '500ms ease-out',
          style({ opacity: 0, transform: 'translateY(-16px)' })
        ),
      ]),
    ]),
  ],
})
export class ProgressPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chartRef') chartRef!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild('chart') chart!: ElementRef;

  public muscles = Object.values(Muscle);

  public filters = Object.values(FilterType);

  public filterForm: FormGroup<FilterForm> = this.fb.group({
    filter: [FilterType.BY_MUSCLE],
    value: [this.muscles[0].toString()],
  });

  public loadingGraph: boolean = false;

  @ViewChild('searchDivRef')
  public searchRef!: ElementRef;
  public isExerciseSearchOpen: boolean = false;
  public filteredExercises: SimpleExercise[] = [];

  private debouncer: Subject<string> = new Subject();
  private debouncerSubscription?: Subscription;
  private data: { x: string; y: number }[] = [];
  private dates: string[] = [];
  private filterValue: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private routineService: RoutinesService,
    private exercisesService: ExercisesService,
    private fb: FormBuilder
  ) {
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
          text: 'Weight (kg)',
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

  private includeExercise(exercise: SimpleExercise, date: Date): void {
    this.dates.includes(date.toISOString())
      ? this.chooseHigherWeight(exercise, date)
      : this.addData(exercise, date);
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
      res.forEach((routine) => {
        routine.exercises.forEach((exercise) => {
          let superset: Superset = exercise as Superset;
          if (superset.exercises) {
            superset.exercises.forEach((simpleExercise) => {
              if (
                simpleExercise.series &&
                (simpleExercise.muscle === this.filterForm.value.value ||
                  simpleExercise.name === this.filterValue)
              ) {
                this.includeExercise(
                  simpleExercise,
                  new Date(routine.realizationDate)
                );
              }
            });
          } else {
            let simpleExercise: SimpleExercise = exercise as SimpleExercise;
            if (simpleExercise.series) {
              this.includeExercise(
                simpleExercise,
                new Date(routine.realizationDate)
              );
            }
          }

          this.chartRef.updateSeries([
            {
              name: new TitleCasePipe().transform(
                filterValue.replace('_', ' ')
              ),
              data: this.data,
            },
          ]);
        });
      });
    } else {
      this.chartRef.updateSeries([
        {
          name: filterValue,
          data: this.data,
        },
      ]);
    }
  }

  hideGraph(): void {
    this.loadingGraph = true;
    this.chart.nativeElement.style.display = 'none';
  }

  showGraph(): void {
    this.loadingGraph = false;
    this.chart.nativeElement.style.display = 'flex';
  }

  onFilterChange(): void {
    if (this.filterForm.value.filter === FilterType.BY_EXERCISE_NAME) {
      this.filterForm.patchValue({
        value: '',
      });
    }
  }

  onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }

  onCloseDropdown(): void {
    this.isExerciseSearchOpen = false;
  }

  onMuscleSelect(muscle: string): void {
    this.routineService.getRoutinesByMuscle(muscle).subscribe((res) => {
      console.log(res);
      this.fillData(res, muscle);
      this.showGraph();
    });
  }

  onFilteredExerciseClick(exercise: SimpleExercise): void {
    this.routineService
      .getRoutinesByExerciseName(exercise.name)
      .subscribe((res) => {
        this.fillData(res, exercise.name);
        this.showGraph();
        this.filterForm.patchValue({
          filter: FilterType.BY_EXERCISE_NAME,
          value: exercise.name,
        });
      });
  }

  filterExercises(value: string): void {
    this.filterValue = value;
    this.exercisesService
      .findExercisesContainedInAnyRoutine(value)
      .subscribe((res) => {
        this.filteredExercises = res;
      });
  }

  onInputClick(): void {
    this.filterExercises(this.filterValue);
    this.isExerciseSearchOpen = !this.isExerciseSearchOpen;
  }

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(200))
      .subscribe((value) => {
        this.filterExercises(value);
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.hideGraph();
    this.onMuscleSelect(this.muscles[0].toString());
    this.cdr.detectChanges();
  }
}
