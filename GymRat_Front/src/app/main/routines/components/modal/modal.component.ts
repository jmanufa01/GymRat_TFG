import {
  Component,
  ComponentRef,
  Inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SimpleExercise, ModalData, Routine } from '../../interfaces';
import { SupersetComponent } from '../superset/superset.component';
import { Superset } from '../../interfaces/superset.interface';
import { Exercise } from '../../interfaces/exercise.interface';
import { RoutinesService } from '../../services/routines.service';
import { AuthService } from 'src/app/auth/services/auth.service';

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

  public changeView(): void {
    this.newRoutineView = !this.newRoutineView;
  }

  public closeModal(): void {
    this.dialogRef.close();
  }
}
