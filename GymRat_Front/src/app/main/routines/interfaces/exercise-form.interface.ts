import { FormControl, FormGroup } from '@angular/forms';
import { Difficulty, Muscle, Type } from './simple-exercise.interface';

export interface ExerciseForm {
  exerciseName: FormControl<string | null>;
  muscle: FormControl<Muscle | null>;
  type: FormControl<Type | null>;
  difficulty: FormControl<Difficulty | null>;
  series: FormControl<number | null>;
  reps: FormGroup<{
    [key: string]: FormControl<string>;
  }>;
  weights: FormGroup<{
    [key: string]: FormControl<string>;
  }>;
}
