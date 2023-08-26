import { Component, Input, OnChanges, effect } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'routines-exercise',
  templateUrl: './exercise.component.html',
})
export class ExerciseComponent {
  constructor(private fb: FormBuilder) {
    this.exerciseForm.valueChanges.subscribe((value) => {
      this.series = Array(Number(this.exerciseForm.get('series')!.value))
        .fill(0)
        .map((x, i) => i);

      console.log(this.exerciseForm.value);
      console.log(this.series);
    });
  }

  @Input()
  public exerciseNumber: number = 0;

  public series: number[] = [];

  public isSuperset: boolean = false;

  public exerciseForm = this.fb.group({
    exerciseName: [''],
    series: [0],
    reps: [{}],
  });

  public changeExerciseType(): void {
    this.isSuperset = !this.isSuperset;
  }
}
