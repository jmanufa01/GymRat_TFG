import { Exercise } from './exercise.interface';
import { SimpleExercise } from './simple-exercise.interface';

export interface Superset {
  exercises: SimpleExercise[];
}
