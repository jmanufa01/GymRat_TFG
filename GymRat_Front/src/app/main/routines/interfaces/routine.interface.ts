import { Exercise } from './exercise.interface';
import { SimpleExercise } from './simple-exercise.interface';
import { Superset } from './superset.interface';

export interface Routine {
  id?: string;
  realizationDate: string;
  muscularGroup: string[];
  users: string[];
  exercises: (SimpleExercise | Superset)[];
}
