import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ExerciseForm } from '../../interfaces';

@Component({
  selector: 'routines-exercise',
  templateUrl: './exercise.component.html',
})
export class ExerciseComponent {
  constructor(private fb: FormBuilder) {
    this.exerciseForm.valueChanges.subscribe((value) => {
      this.form.emit(this.exerciseForm);
      this.series = Array(Number(this.exerciseForm.get('series')!.value))
        .fill(0)
        .map((x, i) => i);

      if (this.series.length > 0) {
        this.changeControls();
      }
    });
  }
  @Input()
  public exerciseNumber: number = 0;

  public series: number[] = [];

  public exerciseForm: FormGroup<ExerciseForm> = this.fb.group({
    exerciseName: [''],
    muscle: [''],
    series: [0],
    reps: this.fb.group({}),
    weights: this.fb.group({}),
  });

  @Output()
  public form: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public changeControls(): void {
    let controls = this.loadControls();
    if (
      Object.keys(this.exerciseForm.get('reps')!.value).length !==
        this.series.length &&
      Object.keys(this.exerciseForm.get('weights')!.value).length !==
        this.series.length
    ) {
      this.exerciseForm.setControl('reps', controls[0], { emitEvent: false });
      this.exerciseForm.setControl('weights', controls[1], {
        emitEvent: false,
      });
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
