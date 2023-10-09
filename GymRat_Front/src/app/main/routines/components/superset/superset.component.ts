import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ExerciseForm } from '../../interfaces';

@Component({
  selector: 'routines-superset',
  templateUrl: './superset.component.html',
})
export class SupersetComponent {
  @Input()
  public exerciseNumber: number = 0;

  @Input()
  public isSuperset: boolean = false;

  public exercises: number[] = [0];

  public exercisesForms: FormGroup<ExerciseForm>[] = [];

  @Output()
  public trash: EventEmitter<number> = new EventEmitter();

  public changeExerciseType(): void {
    if (this.isSuperset) {
      this.exercises = Array(1)
        .fill(0)
        .map((x, i) => i);
    } else {
      this.exercises = Array(2)
        .fill(0)
        .map((x, i) => i + 1);
    }
    this.exercisesForms = [];
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
}
