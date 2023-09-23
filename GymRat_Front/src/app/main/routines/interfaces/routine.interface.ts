import { Exercise } from './exercise.interface';

export interface Routine {
  realizationDate: string;
  muscularGroup: string[];
  users: string[];
  exercises: Exercise[];
}
