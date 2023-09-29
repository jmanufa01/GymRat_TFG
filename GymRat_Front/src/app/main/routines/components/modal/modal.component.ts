import {
  Component,
  ComponentRef,
  Inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  SimpleExercise,
  ModalData,
  Routine,
  ExerciseForm,
} from '../../interfaces';
import { SupersetComponent } from '../superset/superset.component';
import { Superset } from '../../interfaces/superset.interface';
import { Exercise } from '../../interfaces/exercise.interface';
import { RoutinesService } from '../../services/routines.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormGroup } from '@angular/forms';

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

  private muscularGroup: string[] = [];

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
            //Save muscular group in routine
            if (!this.muscularGroup.includes(y.value.muscle!)) {
              this.muscularGroup.push(y.value.muscle!);
            }

            let exercise: SimpleExercise = {
              name: y.value.exerciseName!,
              muscle: y.value.muscle!,
              type: y.value.type!,
              series: y.value.series!,
              difficulty: y.value.difficulty!,
              reps: Object.values(y.value.reps!).map((r) => parseInt(r!)),
              weights: Object.values(y.value.weights!).map((w) => parseInt(w!)),
            };
            return exercise;
          }),
        };
        exercise = superset;
      } else {
        //Simple exercise
        const exerciseInstace = instance.exercisesForms[0].value;

        //Save muscular group in routine
        if (!this.muscularGroup.includes(exerciseInstace.muscle!)) {
          this.muscularGroup.push(exerciseInstace.muscle!);
        }

        let simpleExercise: SimpleExercise = {
          name: exerciseInstace.exerciseName!,
          muscle: exerciseInstace.muscle!,
          type: exerciseInstace.type!,
          series: exerciseInstace.series!,
          difficulty: exerciseInstace.difficulty!,
          reps: Object.values(exerciseInstace.reps!).map((r) => parseInt(r!)),
          weights: Object.values(exerciseInstace.weights!).map((w) =>
            parseInt(w!)
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
        muscularGroup: this.muscularGroup,
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
