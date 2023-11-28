import {
  Component,
  Input,
  OnInit,
  ViewContainerRef,
  ViewChild,
  ComponentRef,
  ElementRef,
  EventEmitter,
} from '@angular/core';
import { Routine, Superset } from '../../interfaces';
import { SimpleExercise } from '../../interfaces/simple-exercise.interface';
import { RoutinesService } from '../../services/routines.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SupersetComponent } from '../superset/superset.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { UserService } from 'src/app/main/user/services/user.service';
import { Output } from '@angular/core';

@Component({
  selector: 'routines-routine',
  templateUrl: './routine.component.html',
  animations: [
    trigger('fadeInFromTop', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-16px)' }),
        animate(
          '500ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('fadeOutToTop', [
      transition(':leave', [
        animate(
          '500ms ease-out',
          style({ opacity: 0, transform: 'translateY(-16px)' })
        ),
      ]),
    ]),
  ],
})
export class RoutineComponent implements OnInit {
  constructor(
    private routinesService: RoutinesService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Input()
  public routineNumber!: number;
  @Input()
  public routine!: Routine;

  @Input()
  public dialogRef!: MatDialogRef<ModalComponent>;

  @Output()
  public submitEvent: EventEmitter<{ routine: Routine }> = new EventEmitter();

  public exercises: Superset[] = [];

  @ViewChild('supersetRef', { read: ViewContainerRef })
  public vcr!: ViewContainerRef;

  @ViewChild('shareRef')
  public shareIconRef!: ElementRef;

  public exercisesNumber: number = 1;

  public componentReferences: ComponentRef<SupersetComponent>[] = [];

  private muscularGroup: string[] = [];

  public showExercises: boolean = false;

  public isShareRoutineOpen: boolean = false;

  public friendsToShare: { username: string }[] = [];

  public addExercise(): void {
    const actualRef: ComponentRef<SupersetComponent> =
      this.vcr.createComponent(SupersetComponent);
    const currentComponent: SupersetComponent = actualRef.instance;
    currentComponent.exerciseNumber = this.exercisesNumber;
    currentComponent.trash.subscribe((x) => this.deleteComponent(x));
    this.componentReferences.push(actualRef);
    this.exercisesNumber++;
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
  public obtainExercises(): (Superset | SimpleExercise)[] | null {
    let exercises: (Superset | SimpleExercise)[] = this.componentReferences.map(
      (x) => {
        let instance = x.instance;
        let exercise: Superset | SimpleExercise;
        if (instance.exercisesForms.length > 1) {
          //Superset
          let superset: Superset = {
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
                weights: Object.values(y.value.weights!).map((w) =>
                  parseInt(w!)
                ),
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
      }
    );
    return exercises;
  }

  public saveRoutine(): void {
    let exercises: (Superset | SimpleExercise)[] | null =
      this.obtainExercises();

    if (exercises) {
      let routine: Routine = {
        realizationDate: this.dialogRef._containerInstance._config.data.date,
        muscularGroup: this.muscularGroup,
        users: [this.authService.currentUser()!.username],
        exercises: exercises,
      };
      this.routinesService.insertRoutine(routine).subscribe({
        next: () => {
          this.submitEvent.emit({
            routine: routine,
          });
          this.dialogRef.close();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  public changeShowExercises(): void {
    this.showExercises = !this.showExercises;
  }

  public changeShareRoutine(): void {
    this.isShareRoutineOpen = !this.isShareRoutineOpen;
  }

  public updateFriendsToShare(): void {
    this.userService.getFriendsNotHavingRoutine(this.routine.id!).subscribe({
      next: (friends) => {
        this.friendsToShare = friends;
      },
    });
  }

  public onShareRoutineClick(friendUserName: string): void {
    this.routine.users.push(friendUserName);
    this.routine.exercises = this.exercises.map((exercise) => {
      if (exercise.exercises.length > 1) {
        return exercise;
      } else {
        return exercise.exercises[0];
      }
    });
    this.routinesService.updateRoutine(this.routine).subscribe({
      next: () => {
        this.updateFriendsToShare();
      },
    });
  }

  public onOpenCloseDropdown(): void {
    this.isShareRoutineOpen = !this.isShareRoutineOpen;
  }

  public onCloseDropdown(): void {
    this.isShareRoutineOpen = false;
  }

  ngOnInit(): void {
    if (this.routine) {
      this.updateFriendsToShare();
      this.exercises = this.routine.exercises.map((exercise) => {
        if ((exercise as Superset).exercises) {
          return exercise as Superset;
        } else {
          return {
            exercises: [exercise as SimpleExercise],
          };
        }
      });
    }
  }
}
