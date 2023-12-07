import {
  Component,
  ComponentRef,
  Inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalData, Routine } from '../../interfaces';
import { RoutinesService } from '../../services/routines.service';

@Component({
  selector: 'routines-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private routineService: RoutinesService,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) {}

  public newRoutineView: boolean = false;

  public changeView(): void {
    this.newRoutineView = !this.newRoutineView;
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  public addRoutine(routine: Routine): void {
    this.data.routines.push(routine);
  }

  public deleteRoutine(routine: Routine): void {
    this.data.routines = this.data.routines.filter((r) => r.id !== routine.id);
  }
}
