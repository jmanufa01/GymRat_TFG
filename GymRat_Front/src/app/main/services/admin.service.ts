import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from 'src/app/auth/interfaces';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  public getUsers(): Observable<User[]> {
    const url = `${this.apiUrl}/users`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    return this.httpClient.get<User[]>(url, options).pipe(
      map((users) => {
        return users;
      }),
      catchError((err) => throwError(() => err.message))
    );
  }

  public deleteUser(username: string): Observable<boolean> {
    const url = `${this.apiUrl}/users/${username}`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    return this.httpClient.delete<void>(url, options).pipe(
      map(() => {
        return true;
      }),
      catchError((err) => throwError(() => err.message))
    );
  }
}
