export enum FilterType {
  BY_MUSCLE = 'BY_MUSCLE',
  BY_EXERCISE_NAME = 'BY_EXERCISE_NAME',
}

export interface Filter {
  type: FilterType;
  value: string;
}
