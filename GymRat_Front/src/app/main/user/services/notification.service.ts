import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Notification } from '../interfaces';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public getNotifications(): Observable<Notification[]> {
    const userName = this.authService.currentUser()!.username;
    const url = `${environment.apiUrl}/notifications/${userName}`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };

    return this.http.get(url, options).pipe(
      map((res) => {
        return res as Notification[];
      }),
      catchError((err) => throwError(() => err.message))
    );
  }

  public sendFriendRequest(friendUserName: string): Observable<boolean> {
    const url = `${environment.apiUrl}/notifications`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    const body: Notification = {
      sender: this.authService.currentUser()!.username,
      receiver: friendUserName,
      message: 'Friend request',
      status: 'PENDING',
    };

    return this.http.post(url, body, options).pipe(
      map((res) => {
        return true;
      }),
      catchError((err) => throwError(() => err.message))
    );
  }

  public acceptFriendRequest(notification: Notification): Observable<boolean> {
    const url = `${environment.apiUrl}/notifications`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };

    notification.status = 'ACCEPTED';

    return this.http.post(url, notification, options).pipe(
      map((res) => {
        return true;
      }),
      catchError((err) => throwError(() => err.message))
    );
  }

  public rejectFriendRequest(notification: Notification): Observable<boolean> {
    const url = `${environment.apiUrl}/notifications`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };

    notification.status = 'REJECTED';

    return this.http.post(url, notification, options).pipe(
      map((res) => {
        return true;
      }),
      catchError((err) => throwError(() => err.message))
    );
  }
}
