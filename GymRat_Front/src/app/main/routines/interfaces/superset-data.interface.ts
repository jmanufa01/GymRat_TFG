import { Exercise } from './exercise-data.interface';

export interface Superset extends Exercise {
  id: string;
  exercises: Exercise[];
}
