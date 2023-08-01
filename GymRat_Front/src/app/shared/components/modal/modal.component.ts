import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalData } from '../../interfaces';

@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
  styles: [
    `
      .scrollable-div {
        overflow-y: auto;
      }
    `,
  ],
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) {}

  public newRoutineView: boolean = false;

  public exercisesNumber: number = 0;

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
}
