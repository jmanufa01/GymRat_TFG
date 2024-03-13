import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private jwtHelper: JwtHelperService = new JwtHelperService();

  decodeToken(jwt: string): {
    username: string;
    role: string;
  } {
    const decodedToken = this.jwtHelper.decodeToken(jwt);
    return {
      username: decodedToken.user,
      role: decodedToken.role,
    };
  }
}
