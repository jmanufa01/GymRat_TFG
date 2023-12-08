import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  Difficulty,
  ExerciseForm,
  Muscle,
  SimpleExercise,
  Type,
} from '../../interfaces';

@Component({
  selector: 'routines-exercise',
  templateUrl: './exercise.component.html',
})
export class ExerciseComponent implements OnInit {
  @Input()
  public exerciseNumber: number = 0;

  @Input()
  public exercise?: SimpleExercise;

  @Output()
  public form: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public series: number[] = [];

  public difficulties = Object.values(Difficulty);

  public muscles = Object.values(Muscle);

  public types = Object.values(Type);

  public exerciseForm: FormGroup<ExerciseForm> = this.fb.group({
    exerciseName: [''],
    muscle: [Muscle.ABDOMINALS],
    type: [Type.CARDIO],
    difficulty: [Difficulty.BEGINNER],
    series: [0],
    reps: this.fb.group({}),
    weights: this.fb.group({}),
  });

  constructor(private fb: FormBuilder) {
    this.exerciseForm.valueChanges.subscribe((value) => {
      let seriesValue = Number(this.exerciseForm.get('series')!.value);
      if (seriesValue > 10) {
        this.exerciseForm.patchValue({ series: 10 });
      } else if (seriesValue < 0) {
        this.exerciseForm.patchValue({ series: 0 });
      }

      this.form.emit(this.exerciseForm);
      this.series = Array(seriesValue)
        .fill(0)
        .map((x, i) => i);

      if (this.series.length > 0) {
        this.changeControls();
      }
    });
  }

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
      formGroupReps.addControl(
        `r${serie}`,
        new FormControl(this.exercise?.reps[serie] || '')
      );
      formGroupWeights.addControl(
        `w${serie}`,
        new FormControl(this.exercise?.weights[serie] || '')
      );
    });

    return [formGroupReps, formGroupWeights];
  }

  ngOnInit(): void {
    if (this.exercise) {
      this.series = Array(Number(this.exercise.series))
        .fill(0)
        .map((x, i) => i);
      this.exerciseForm.patchValue({
        exerciseName: this.exercise.name,
        muscle: this.exercise.muscle,
        type: this.exercise.type,
        difficulty: this.exercise.difficulty,
        series: this.exercise.series,
      });
      this.changeControls();
    }
  }
}
