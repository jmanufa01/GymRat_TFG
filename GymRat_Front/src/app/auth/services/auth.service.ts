import { Injectable, computed, signal } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthResponse, AuthStatus, User } from '../interfaces';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtService: JwtService) {}
  private readonly apiUrl: string = environment.apiUrl;

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.Checking);

  //! To the external world, this is a read-only property
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  login(username: string, password: string): Observable<boolean> {
    const url: string = `${this.apiUrl}/auth/login`;
    const body = { username, password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap(({ jwt }) => {
        localStorage.setItem('jwt', jwt); //TODO: Use a cookie instead of localStorage
        this._currentUser.set({
          username: this.jwtService.decodeUsername(jwt),
          role: 'user', //TODO: Call the API to get the role
        });
        this._authStatus.set(AuthStatus.Authenticated);
        console.log('token :>> ', jwt);
      }),
      map(() => true),
      catchError((err) => {
        return throwError(() => 'Invalid username or password');
      })
    );
    //TODO: errors
  }
}
