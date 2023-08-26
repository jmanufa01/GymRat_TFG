import { Exercise } from './exercise-data.interface';
import { Superset } from './superset-data.interface';

export interface RoutineData {
  code: string;
  realizationDate: Date;
  muscularGroup: string[];
  users: string[];
  exercises: Exercise[] | Superset[];
}
