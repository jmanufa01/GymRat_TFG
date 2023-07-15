import { Injectable, computed, signal } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { AuthResponse, AuthStatus } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private readonly apiUrl: string = environment.apiUrl;

  //private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.Checking);

  //! To the external world, this is a read-only property
  //public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  login(username: string, password: string): Observable<boolean> {
    const url: string = `${this.apiUrl}/auth/login`;
    const body = { username, password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap(({ jwt }) => {
        localStorage.setItem('jwt', jwt);
        this._authStatus.set(AuthStatus.Authenticated);
        console.log('token :>> ', jwt);
      }),
      map(() => true)
    );
    //TODO: errors
  }
}
