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
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'routines-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private routinesService: RoutinesService,
    private authService: AuthService
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
    this.exercisesNumber++;
  }

  public changeView(): void {
    this.componentReferences = [];
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

  //Change !
  public obtainExercises(): Exercise[] | null {
    let exercises: Exercise[] = this.componentReferences.map((x) => {
      let instance = x.instance;
      let exercise: Exercise;
      if (instance.exercisesForms.length > 1) {
        //Superset
        let superset: Superset = {
          series: instance.exercisesForms[0].value.series!, //Save series in superset
          exercises: instance.exercisesForms.map((y) => {
            let exercise: SimpleExercise = {
              name: y.value.exerciseName!,
              muscle: 'dummy',
              type: 'dummy',
              series: y.value.series!,
              difficulty: 'dummy',
              reps: Object.values(y.value.reps!).map((r) => parseInt(r!)),
              weights: Object.values(y.value.weights!).map((w) => parseInt(w!)),
            };
            return exercise;
          }),
        };
        exercise = superset;
      } else {
        //Simple exercise
        let simpleExercise: SimpleExercise = {
          name: instance.exercisesForms[0].value.exerciseName!,
          muscle: 'dummy',
          type: 'dummy',
          series: instance.exercisesForms[0].value.series!,
          difficulty: 'dummy',
          reps: Object.values(instance.exercisesForms[0].value.reps!).map((r) =>
            parseInt(r!)
          ),
          weights: Object.values(instance.exercisesForms[0].value.weights!).map(
            (w) => parseInt(w!)
          ),
        };
        exercise = simpleExercise;
      }
      return exercise!;
    });
    return exercises;
  }

  public saveRoutine(): void {
    let exercises: Exercise[] | null = this.obtainExercises();

    if (exercises) {
      let routine: Routine = {
        realizationDate: this.dialogRef._containerInstance._config.data.date,
        muscularGroup: ['biceps', 'back'],
        users: [this.authService.currentUser()!.username],
        exercises: exercises,
      };
      this.routinesService.insertRoutine(routine).subscribe({
        next: () => this.changeView(),
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
