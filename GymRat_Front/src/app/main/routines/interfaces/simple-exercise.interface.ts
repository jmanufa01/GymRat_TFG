import { Exercise } from './exercise.interface';

export interface SimpleExercise extends Exercise {
  name: string;
  muscle: Muscle;
  type: Type;
  difficulty: Difficulty;
  reps: number[];
  weights: number[];
}

export enum Type {
  CARDIO = 'cardio',
  OLYMPIC_WEIGHTLIFTING = 'olympic_weightlifting',
  PLYOMETRICS = 'plyometrics',
  POWERLIFTING = 'powerlifting',
  STRENGTH = 'strength',
  STRETCHING = 'stretching',
  STRONGMAN = 'strongman',
}

export enum Muscle {
  ABDOMINALS = 'abdominals',
  ABDUCTOR = 'abductors',
  ADDUCTOR = 'adductors',
  BICEPS = 'biceps',
  CALVES = 'calves',
  CHEST = 'chest',
  FOREARMS = 'forearms',
  GLUTES = 'glutes',
  HAMSTRINGS = 'hamstrings',
  LATS = 'lats',
  LOWER_BACK = 'lower_back',
  MIDDLE_BACK = 'middle_back',
  NECK = 'neck',
  QUADRICEPS = 'quadriceps',
  TRAPS = 'traps',
  TRICEPS = 'triceps',
}

export enum Difficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  EXPERT = 'expert',
}
