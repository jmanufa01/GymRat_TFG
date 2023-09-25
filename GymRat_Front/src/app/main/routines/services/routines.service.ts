import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Routine } from '../interfaces';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { options } from '@fullcalendar/core/preact';

@Injectable({
  providedIn: 'root',
})
export class RoutinesService {
  constructor(private http: HttpClient) {}

  private readonly apiUrl: string = environment.apiUrl;

  public insertRoutine(routine: Routine): Observable<boolean> {
    console.log(routine);
    const url = `${this.apiUrl}/routines/save`;
    const body = routine;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    return this.http.post(url, body, options).pipe(
      map((res) => {
        console.log(res);
        return true;
      }),
      catchError((err) => {
        console.log(err);
        return throwError(() => err.message);
      })
    );
  }
}
