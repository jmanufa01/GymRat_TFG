import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { Exercise, Routine, Superset } from '../../interfaces';
import { SimpleExercise } from '../../interfaces/simple-exercise.interface';

@Component({
  selector: 'routines-routine',
  templateUrl: './routine.component.html',
})
export class RoutineComponent implements OnInit {
  constructor() {}

  @Input()
  public routineNumber!: number;
  @Input()
  public routine!: Routine;
  public exercises: any[] = [];

  ngOnInit(): void {
    this.exercises = this.routine.exercises.map((exercise) => {
      let superset: Superset = exercise as Superset;
      console.log('Superset: ', superset);
      if (superset.exercises) {
        return superset;
      }
      console.log('Simple exercise: ', exercise as SimpleExercise);
      return exercise as SimpleExercise;
    });

    console.log('Exercises: ', this.exercises);
  }
}
