import { FormControl, FormGroup } from '@angular/forms';

export interface ExerciseForm {
  exerciseName: FormControl<string | null>;
  muscle: FormControl<string | null>;
  series: FormControl<number | null>;
  reps: FormGroup<{
    [key: string]: FormControl<string>;
  }>;
  weights: FormGroup<{
    [key: string]: FormControl<string>;
  }>;
}
