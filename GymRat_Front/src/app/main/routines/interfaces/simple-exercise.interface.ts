import { Exercise } from './exercise.interface';

export interface SimpleExercise extends Exercise {
  name: string;
  muscle: string;
  type: string;
  difficulty: string;
  reps: number[];
  weights: number[];
}
