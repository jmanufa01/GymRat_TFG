import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from '../../../../environment/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';
import { Notification } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public getProfile(): Observable<Profile> {
    const userName = this.authService.currentUser()!.username;
    const url = `${environment.apiUrl}/users/profile/${userName}`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    return this.http.get(url, options).pipe(
      map((res) => {
        return res as Profile;
      }),
      catchError((err) => throwError(() => err.message))
    );
  }

  public getUsersByUserName(
    userName: string
  ): Observable<{ username: string }[]> {
    const url = `${environment.apiUrl}/users?username=${userName}`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    return this.http.get(url, options).pipe(
      map((res) => {
        return res as { username: string }[];
      }),
      catchError((err) => throwError(() => err.message))
    );
  }

  public getFriendsUsernames(): Observable<{ username: string }[]> {
    const url = `${environment.apiUrl}/users/friends`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    return this.http.get(url, options).pipe(
      map((res) => {
        return res as { username: string }[];
      }),
      catchError((err) => throwError(() => err.message))
    );
  }

  public getFriendsNotHavingRoutine(
    routineId: string
  ): Observable<{ username: string }[]> {
    const url = `${environment.apiUrl}/users/friends?routineId=${routineId}`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    return this.http.get(url, options).pipe(
      map((res) => {
        return res as { username: string }[];
      }),
      catchError((err) => throwError(() => err.message))
    );
  }

  public deleteFriend(friendUserName: string): Observable<any> {
    const url = `${environment.apiUrl}/users/friends?friendUsername=${friendUserName}`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    return this.http.delete(url, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => throwError(() => err.message))
    );
  }
}
