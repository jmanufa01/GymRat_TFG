import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTheme,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent,
} from 'ng-apexcharts';
import {
  FilterForm,
  FilterType,
} from 'src/app/main/progress/interfaces/filters.interface';
import {
  Muscle,
  Routine,
  SimpleExercise,
} from 'src/app/main/routines/interfaces';
import { RoutinesService } from '../../../routines/services/routines.service';
import { Subject, Subscription, debounceTime } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  theme: ApexTheme;
};

@Component({
  selector: 'progress-page',
  templateUrl: './progress-page.component.html',
})
export class ProgressPageComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  public muscles = Object.values(Muscle);

  public filters = Object.values(FilterType);

  public filterForm: FormGroup<FilterForm> = this.fb.group({
    filter: [FilterType.BY_MUSCLE],
    value: [this.muscles[0].toString()],
  });

  private debouncer: Subject<string> = new Subject();
  private debouncerSubscription?: Subscription;
  private data: { x: string; y: number }[] = [];

  constructor(
    private routineService: RoutinesService,
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
      },
      theme: {
        mode: 'light',
        palette: 'palette10',
      },
    };
  }

  private fillData(res: Routine[], filterValue: string): void {
    this.data = [];
    if (res.length > 0) {
      res.forEach((routine) => {
        routine.exercises.forEach((exercise) => {
          let simpleExercise: SimpleExercise = exercise as SimpleExercise;
          if (simpleExercise.series) {
            let date: Date = new Date(routine.realizationDate);

            this.data.push({
              x: `${date.getFullYear()}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${date
                .getDate()
                .toString()
                .padStart(2, '0')} GMT`,
              y: Math.max(...simpleExercise.weights!),
            });
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

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(200))
      .subscribe((value) => {
        this.routineService
          .getRoutinesByExerciseName(value)
          .subscribe((res) => {
            this.fillData(res, value);
          });
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }
}
