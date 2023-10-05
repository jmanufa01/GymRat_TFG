import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Difficulty,
  Exercise,
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
  constructor(private fb: FormBuilder) {
    this.exerciseForm.valueChanges.subscribe((value) => {
      this.form.emit(this.exerciseForm);
      this.series = Array(Number(this.exerciseForm.get('series')!.value))
        .fill(0)
        .map((x, i) => i);

      console.log('Series: ', this.series);

      if (this.series.length > 0) {
        this.changeControls();
      }
    });
  }

  @Input()
  public exerciseNumber: number = 0;

  @Input()
  public exercise?: SimpleExercise;

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
      console.log('Series: ', this.series);
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
