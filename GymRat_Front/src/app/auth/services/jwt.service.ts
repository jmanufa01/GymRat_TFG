import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private jwtHelper = new JwtHelperService();

  decodeUsername(jwt: string): string {
    const decodedToken = this.jwtHelper.decodeToken(jwt);
    return decodedToken.username;
  }
}
