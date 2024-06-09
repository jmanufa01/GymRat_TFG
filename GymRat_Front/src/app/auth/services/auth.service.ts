import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';
import { AuthResponse, AuthStatus, CheckResponse, User } from '../interfaces';
import { JwtService } from './jwt.service';

import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl: string = environment.apiUrl;

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.Checking);

  //! To the external world, this is a read-only property
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router
  ) {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(jwt: string): boolean {
    this._authStatus.set(AuthStatus.Authenticated);
    localStorage.setItem('jwt', jwt);
    let user = this.jwtService.decodeToken(jwt);
    this._currentUser.set({
      username: user.username,
      role: user.role,
    });
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

  register(body: FormGroup): Observable<boolean> {
    const url: string = `${this.apiUrl}/auth/register`;

    return this.http.post<AuthResponse>(url, body.value).pipe(
      map(({ jwt }) => this.setAuthentication(jwt)),
      catchError((err) => throwError(() => err))
    );
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.NotAuthenticated);
    this.router.navigateByUrl('/auth/login');
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
        this._authStatus.set(AuthStatus.NotAuthenticated);
        localStorage.removeItem('jwt');
        return of(false);
      })
    );
  }
}
