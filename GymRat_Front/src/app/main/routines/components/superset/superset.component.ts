import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExerciseForm, SimpleExercise } from '../../interfaces';

@Component({
  selector: 'routines-superset',
  templateUrl: './superset.component.html',
})
export class SupersetComponent implements OnInit {
  @Input()
  public exerciseNumber: number = 0;

  @Input()
  public isSuperset: boolean = false;

  @Input()
  public hideItems = false;

  @Input()
  public exercises: (SimpleExercise | undefined)[] = Array(1).fill(undefined);

  @Input()
  public editing: boolean = false;

  @Output()
  public trash: EventEmitter<number> = new EventEmitter();

  @Output()
  public creationEvent: EventEmitter<SupersetComponent> = new EventEmitter();

  public exercisesForms: FormGroup<ExerciseForm>[] = [];

  constructor(private fb: FormBuilder) {}

  public changeExerciseType(): void {
    if (this.isSuperset) {
      this.exercises.pop();
      this.exercisesForms.pop();
    } else {
      this.exercises.push(undefined);
    }
    this.isSuperset = !this.isSuperset;
  }

  public addExercise(exerciseForm: FormGroup): void {
    if (!this.exercisesForms.includes(exerciseForm)) {
      this.exercisesForms.push(exerciseForm);
    } else {
      this.exercisesForms.map((form) => {
        if (form === exerciseForm) {
          form = exerciseForm;
        }
      });
    }
  }

  public trashClick(): void {
    this.trash.emit(this.exerciseNumber);
  }

  public ngOnInit(): void {
    this.creationEvent.emit(this);
  }
}
