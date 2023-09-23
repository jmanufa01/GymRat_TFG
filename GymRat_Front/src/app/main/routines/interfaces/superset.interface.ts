import { Exercise } from './exercise.interface';
import { SimpleExercise } from './simple-exercise.interface';

export interface Superset extends Exercise {
  exercises: SimpleExercise[];
}
