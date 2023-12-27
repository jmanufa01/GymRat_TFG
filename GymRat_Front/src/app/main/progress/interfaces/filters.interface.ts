import { FormControl } from '@angular/forms';

export enum FilterType {
  BY_MUSCLE = 'BY_MUSCLE',
  BY_EXERCISE_NAME = 'BY_EXERCISE_NAME',
}

export interface Filter {
  filter: FilterType;
  value: string;
}

export interface FilterForm {
  filter: FormControl<FilterType | null>;
  value: FormControl<string | null>;
}
