import { Injectable, computed, signal } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthResponse, AuthStatus, CheckResponse, User } from '../interfaces';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
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
    localStorage.setItem('jwt', jwt); //TODO: Use a cookie instead of localStorage
    console.log(this.jwtService.decodeUsername(jwt));
    this._currentUser.set({
      username: this.jwtService.decodeUsername(jwt),
      role: 'user', //TODO: Call the API to get the role
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
    //const { username, email, password, birthDate, height, weight } = body.value;

    return this.http.post<AuthResponse>(url, body.value).pipe(
      map(({ jwt }) => this.setAuthentication(jwt)),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.NotAuthenticated);
    this.router.navigateByUrl('/auth/login');
  }

  checkAuthStatus(): Observable<boolean> {
    console.log(this.authStatus());
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
        localStorage.removeItem('jwt');
        return of(false);
      })
    );
  }
}
