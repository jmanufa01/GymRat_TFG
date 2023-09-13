import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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

      if (this.series.length > 0) {
        this.changeControls();
      }

      console.log(this.exerciseForm.get('reps')?.value);
    });
  }

  @Input()
  public exerciseNumber: number = 0;

  public series: number[] = [];

  public isSuperset: boolean = false;

  public exerciseForm: FormGroup = this.fb.group({
    exerciseName: [''],
    series: [0],
  });

  public changeExerciseType(): void {
    this.isSuperset = !this.isSuperset;
  }

  public changeControls(): void {
    let controls = this.loadControls();

    if (!this.exerciseForm.get('reps') && !this.exerciseForm.get('weights')) {
      this.exerciseForm.addControl('reps', controls[0], { emitEvent: false });
      this.exerciseForm.addControl('weights', controls[1], {
        emitEvent: false,
      });
    } else {
      if (
        Object.keys(this.exerciseForm.get('reps')?.value).length !==
          this.series.length &&
        Object.keys(this.exerciseForm.get('weights')?.value).length !==
          this.series.length
      ) {
        this.exerciseForm.setControl('reps', controls[0], { emitEvent: false });
        this.exerciseForm.setControl('weights', controls[1], {
          emitEvent: false,
        });
      }
    }
  }

  public loadControls(): [FormGroup<{}>, FormGroup<{}>] {
    let formGroupReps = new FormGroup({});
    let formGroupWeights = new FormGroup({});

    this.series.forEach((serie) => {
      formGroupReps.addControl(`r${serie}`, new FormControl(''));
      formGroupWeights.addControl(`w${serie}`, new FormControl(''));
    });

    return [formGroupReps, formGroupWeights];
  }
}
