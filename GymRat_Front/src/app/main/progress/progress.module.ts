import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressRoutingModule } from './progress-routing.module';
import { ProgressPageComponent } from './pages/progress-page/progress-page.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProgressPageComponent],
  imports: [
    CommonModule,
    ProgressRoutingModule,
    NgApexchartsModule,
    SharedModule,
  ],
})
export class ProgressModule {}
