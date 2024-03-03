import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Difficulty,
  ExerciseForm,
  Muscle,
  SimpleExercise,
  Type,
} from '../../interfaces';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { ExercisesService } from '../../services/exercises.service';

@Component({
  selector: 'routines-exercise',
  templateUrl: './exercise.component.html',
})
export class ExerciseComponent implements OnInit, OnDestroy {
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

  public isExerciseSearchOpen: boolean = false;

  @ViewChild('searchRef')
  public searchDivRef!: ElementRef;

  private debouncer: Subject<string> = new Subject();
  private debouncerSubscription?: Subscription;
  public filteredExercises: SimpleExercise[] = [];

  public exerciseForm: FormGroup<ExerciseForm> = this.fb.group({
    exerciseName: ['', [Validators.required]],
    muscle: [Muscle.ABDOMINALS],
    type: [Type.CARDIO],
    difficulty: [Difficulty.BEGINNER],
    series: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
    reps: this.fb.group({}),
    weights: this.fb.group({}),
  });

  constructor(
    private fb: FormBuilder,
    private exercisesService: ExercisesService
  ) {
    this.exerciseForm.valueChanges.subscribe((value) => {
      console.log(value);
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
        new FormControl(this.exercise?.reps![serie] || '')
      );
      formGroupWeights.addControl(
        `w${serie}`,
        new FormControl(this.exercise?.weights![serie] || '')
      );
    });

    return [formGroupReps, formGroupWeights];
  }

  public onCloseDropdown(): void {
    this.isExerciseSearchOpen = false;
  }

  public onKeyPress(searchTerm: string): void {
    if (this.isExerciseSearchOpen) {
      this.debouncer.next(searchTerm);
    }
  }

  public onFilteredExerciseClick(exercise: SimpleExercise): void {
    this.exerciseForm.patchValue({
      exerciseName: exercise.name,
      muscle: exercise.muscle,
      type: exercise.type,
      difficulty: exercise.difficulty,
    });
    this.isExerciseSearchOpen = false;
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

    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(200))
      .subscribe((value) => {
        this.exercisesService.findExercisesByName(value).subscribe((res) => {
          this.filteredExercises = res;
        });
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }
}
