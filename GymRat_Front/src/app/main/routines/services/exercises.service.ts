import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SimpleExercise } from '../interfaces';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  constructor(private httpClient: HttpClient) {}
  private readonly apiUrl: string = environment.apiUrl;
  private readonly exercisesApiUrl: string =
    'https://api.api-ninjas.com/v1/exercises';
  private readonly apiKey: string = 'nS+3ApMDv4UOh8M7Nx9Mvw==pFgbdVKINd8Ofid6';

  public findExercisesByName(name: string): Observable<SimpleExercise[]> {
    const url = `${this.exercisesApiUrl}?name=${name}`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
      },
    };
    return this.httpClient.get<SimpleExercise[]>(url, options).pipe(
      map((res) => res),
      catchError((err) => throwError(() => err.message))
    );
  }

  public findExercisesContainedInAnyRoutine(
    searchTerm: string
  ): Observable<SimpleExercise[]> {
    const url = `${this.apiUrl}/exercises?name=${searchTerm}`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    return this.httpClient.get<SimpleExercise[]>(url, options).pipe(
      map((res) => res),
      catchError((err) => throwError(() => err.message))
    );
  }
}
