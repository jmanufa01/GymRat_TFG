import {
  Component,
  ComponentRef,
  Inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalData } from '../../interfaces';
import { SupersetComponent } from '../superset/superset.component';

@Component({
  selector: 'routines-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) {}

  @ViewChild('supersetRef', { read: ViewContainerRef })
  public vcr!: ViewContainerRef;

  public newRoutineView: boolean = false;

  public exercisesNumber: number = 1;

  public componentReferences: ComponentRef<SupersetComponent>[] = [];

  public addExercise(): void {
    const actualRef: ComponentRef<SupersetComponent> =
      this.vcr.createComponent(SupersetComponent);
    const currentComponent: SupersetComponent = actualRef.instance;
    currentComponent.exerciseNumber = this.exercisesNumber;
    currentComponent.trash.subscribe((x) => this.deleteComponent(x));
    this.componentReferences.push(actualRef);
    console.log(this.componentReferences[0].instance.exercisesForms);
    this.exercisesNumber++;
  }

  public changeView(): void {
    this.newRoutineView = !this.newRoutineView;
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  public deleteComponent(exerciseNumber: number): void {
    if (this.vcr.length < 1) return;
    const ref: ComponentRef<SupersetComponent> = this.componentReferences.find(
      (x) => x.instance.exerciseNumber === exerciseNumber
    )!;
    this.vcr.remove(this.vcr.indexOf(ref.hostView));
    this.componentReferences = this.componentReferences.filter(
      (x) => x.instance.exerciseNumber !== exerciseNumber
    );

    this.componentReferences.map((x) => {
      if (x.instance.exerciseNumber > exerciseNumber) {
        x.instance.exerciseNumber--;
      }
    });

    this.exercisesNumber--;
  }
}
