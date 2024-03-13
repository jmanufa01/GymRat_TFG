import {
  Component,
  Input,
  OnInit,
  ViewContainerRef,
  ViewChild,
  ComponentRef,
  ElementRef,
  EventEmitter,
  ChangeDetectorRef,
  AfterViewInit,
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
import { FormGroup } from '@angular/forms';
import { throwError } from 'rxjs';

@Component({
  selector: 'routines-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css'],
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
export class RoutineComponent implements OnInit, AfterViewInit {
  @Input()
  public routineNumber!: number;

  @Input()
  public routine!: Routine;

  @Input()
  public dialogRef!: MatDialogRef<ModalComponent>;

  @Output()
  public submitEvent: EventEmitter<{ routine: Routine }> = new EventEmitter();

  @Output()
  public deleteEvent: EventEmitter<{ routine: Routine }> = new EventEmitter();

  public exercises: Superset[] = [];

  @ViewChild('supersetRef', { read: ViewContainerRef })
  public vcr!: ViewContainerRef;

  @ViewChild('shareRef')
  public shareIconRef!: ElementRef;

  public exercisesNumber: number = 1;

  public componentReferences: ComponentRef<SupersetComponent>[] = [];

  public superSetComponents: SupersetComponent[] = [];

  private muscularGroup: string[] = [];

  public showExercises: boolean = false;

  public isShareRoutineOpen: boolean = false;

  public friendsToShare: { username: string }[] = [];

  public isError: boolean = false;

  public editingRoutine: boolean = false;

  constructor(
    private routinesService: RoutinesService,
    private authService: AuthService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  public addExercise(): void {
    const actualRef: ComponentRef<SupersetComponent> =
      this.vcr.createComponent(SupersetComponent);
    const currentComponent: SupersetComponent = actualRef.instance;
    currentComponent.exerciseNumber = this.exercisesNumber;
    currentComponent.trash.subscribe((x) => this.deleteComponent(x));
    currentComponent.editing = true;
    this.componentReferences.push(actualRef);
    this.exercisesNumber++;
  }

  public deleteComponent(exerciseNumber: number): void {
    if (this.superSetComponents.length > 0) {
      this.superSetComponents = this.superSetComponents.filter(
        (x) => x.exerciseNumber !== exerciseNumber
      );

      let index = this.exercises.indexOf(this.exercises[exerciseNumber - 1])!;
      this.exercises.splice(index, 1);
    }

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

  public obtainExercises(
    supersetComponent: SupersetComponent
  ): Superset | SimpleExercise {
    let exercise: Superset | SimpleExercise;
    if (supersetComponent.exercisesForms.length > 1) {
      supersetComponent.exercisesForms.map((form) => {
        if (!this.isFormValid(form)) {
          throw new Error('Invalid form');
        }
      });

      //Superset
      let superset: Superset = {
        exercises: supersetComponent.exercisesForms.map((y) => {
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
      let form = supersetComponent.exercisesForms[0];

      if (!this.isFormValid(form)) {
        throw new Error('Invalid form');
      }

      //Simple exercise
      const exerciseInstace = form.value;

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

  public obtainCreatedExercises(): (Superset | SimpleExercise)[] | null {
    let exercises: (Superset | SimpleExercise)[] = this.componentReferences.map(
      (x) => {
        let supersetComponent = x.instance;
        return this.obtainExercises(supersetComponent);
      }
    );
    return exercises;
  }

  public obtainUpdatedExercises(): (Superset | SimpleExercise)[] | null {
    let exercises: (Superset | SimpleExercise)[] = this.superSetComponents.map(
      (supersetComponent) => {
        return this.obtainExercises(supersetComponent);
      }
    );
    return exercises;
  }

  public saveRoutine(): void {
    try {
      if (this.routine) {
        this.routine.muscularGroup = this.muscularGroup;
        if (this.superSetComponents.length > 0) {
          this.routine.exercises = this.obtainUpdatedExercises()!;
        }
        if (this.componentReferences.length > 0) {
          this.routine.exercises.push(...this.obtainCreatedExercises()!);
        }

        this.routinesService.updateRoutine(this.routine).subscribe({
          next: () => {
            this.editingRoutine = false;
          },
        });
      } else {
        let exercises: (Superset | SimpleExercise)[] | null =
          this.obtainCreatedExercises();

        if (exercises) {
          let routine: Routine = {
            realizationDate:
              this.dialogRef._containerInstance._config.data.date,
            muscularGroup: this.muscularGroup,
            users: [this.authService.currentUser()!.username],
            exercises: exercises,
          };
          this.routinesService.insertRoutine(routine).subscribe({
            next: (res) => {
              this.submitEvent.emit({
                routine: res,
              });
              this.dialogRef.componentInstance.changeView();
            },
            error: (err) => throwError(() => err),
          });
        }
      }
      this.isError = false;
    } catch (err) {
      this.isError = true;
    }
  }

  public onRemoveRoutineClick(routine: Routine): void {
    this.routinesService.deleteRoutine(routine).subscribe({
      next: () => {
        this.deleteEvent.emit({
          routine: routine,
        });
      },
    });
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

  public onEditRoutineClick(): void {
    this.editingRoutine = true;
  }

  public addComponent(superSet: SupersetComponent): void {
    this.superSetComponents.push(superSet);
  }

  public isFormValid(form: FormGroup): boolean {
    return form.valid && form.get('weights')!.valid && form.get('reps')!.valid;
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

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
