import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalData } from '../../interfaces';

@Component({
  selector: 'routines-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) {}

  public newRoutineView: boolean = false;

  public exercisesNumber: number = 1;

  public exercises: number[] = [];

  public addExercise(): void {
    this.exercises.push(this.exercisesNumber++);
  }

  public changeView(): void {
    this.newRoutineView = !this.newRoutineView;
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  public deleteComponent(exerciseNumber: number): void {
    this.exercises = this.exercises.filter((x) => x !== exerciseNumber);
    this.exercises = this.exercises.map((x) => {
      if (x > exerciseNumber) {
        x--;
      }
      return x;
    });
    console.log(this.exercises);
    this.exercisesNumber--;
  }
}
