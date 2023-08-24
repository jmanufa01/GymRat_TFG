import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-exercise',
  templateUrl: './exercise.component.html',
})
export class ExerciseComponent {
  @Input()
  public exerciseNumber: number = 0;

  public isSuperset: boolean = false;

  public changeExerciseType(): void {
    this.isSuperset = !this.isSuperset;
  }
}
