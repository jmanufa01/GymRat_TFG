import { Injectable, computed, signal } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthResponse, AuthStatus, CheckResponse, User } from '../interfaces';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router
  ) {
    this.checkAuthStatus().subscribe();
  }
  private readonly apiUrl: string = environment.apiUrl;

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.Checking);

  //! To the external world, this is a read-only property
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  private setAuthentication(jwt: string): boolean {
    localStorage.setItem('jwt', jwt); //TODO: Use a cookie instead of localStorage
    this._currentUser.set({
      username: this.jwtService.decodeUsername(jwt),
      role: 'user', //TODO: Call the API to get the role
    });
    this._authStatus.set(AuthStatus.Authenticated);
    this.router.navigateByUrl('/routines/home');
    return true;
  }

  login(username: string, password: string): Observable<boolean> {
    const url: string = `${this.apiUrl}/auth/login`;
    const body = { username, password };

    return this.http.post<AuthResponse>(url, body).pipe(
      map(({ jwt }) => this.setAuthentication(jwt)),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.apiUrl}/auth/check`;
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
      this._authStatus.set(AuthStatus.NotAuthenticated);
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);

    return this.http.get<CheckResponse>(url, { headers }).pipe(
      map(({ jwt }) => this.setAuthentication(jwt)),
      catchError((err) => {
        console.log({ err });
        this._authStatus.set(AuthStatus.NotAuthenticated);
        return of(false);
      })
    );
  }
}
