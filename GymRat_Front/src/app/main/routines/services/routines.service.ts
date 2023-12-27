import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Routine } from '../interfaces';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { AuthService } from 'src/app/auth/services/auth.service';
import { co } from '@fullcalendar/core/internal-common';

@Injectable({
  providedIn: 'root',
})
export class RoutinesService {
  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getRoutinesByDate(date: Date): Observable<Routine[]> {
    const formattedDate =
      date.getFullYear() +
      '-' +
      String(date.getMonth() + 1).padStart(2, '0') +
      '-' +
      date.getDate();
    const url = `${this.apiUrl}/routines/${formattedDate}`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        usernameHeader: this.authService.currentUser()!.username,
      },
    };

    return this.http.get<Routine[]>(url, options).pipe(
      map((res) => res),
      catchError((err) => throwError(() => err.message))
    );
  }

  public getRoutinesByMuscle(muscle: string): Observable<Routine[]> {
    const username = this.authService.currentUser()!.username;
    const url = `${this.apiUrl}/routines?username=${username}&muscle=${muscle}`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        usernameHeader: this.authService.currentUser()!.username,
      },
    };

    return this.http.get<Routine[]>(url, options).pipe(
      map((res) => res),
      catchError((err) => throwError(() => err.message))
    );
  }

  public getRoutinesByExerciseName(
    exerciseName: string
  ): Observable<Routine[]> {
    const username = this.authService.currentUser()!.username;
    const url = `${this.apiUrl}/routines?username=${username}&exerciseName=${exerciseName}`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        usernameHeader: this.authService.currentUser()!.username,
      },
    };

    return this.http.get<Routine[]>(url, options).pipe(
      map((res) => res),
      catchError((err) => throwError(() => err.message))
    );
  }

  public insertRoutine(routine: Routine): Observable<Routine> {
    const url = `${this.apiUrl}/routines`;
    const body = routine;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    return this.http.post<Routine>(url, body, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => throwError(() => err.message))
    );
  }

  public updateRoutine(routine: Routine): Observable<boolean> {
    console.log(routine);
    const url = `${this.apiUrl}/routines`;
    const body = routine;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    return this.http.put(url, body, options).pipe(
      map((res) => {
        return true;
      }),
      catchError((err) => throwError(() => err.message))
    );
  }

  public deleteRoutine(routine: Routine): Observable<boolean> {
    const username = this.authService.currentUser()!.username;
    const url = `${this.apiUrl}/routines/${routine.id}?username=${username}`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    return this.http.delete(url, options).pipe(
      map((res) => {
        return true;
      }),
      catchError((err) => throwError(() => err.message))
    );
  }
}
