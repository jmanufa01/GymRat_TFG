import { Component, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent,
} from 'ng-apexcharts';
import { FilterType } from 'src/app/main/interfaces/filters.interface';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'progress-page',
  templateUrl: './progress-page.component.html',
})
export class ProgressPageComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  public filters = Object.values(FilterType);

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Series 1',
          data: [31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42],
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
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
    };
  }
}
