import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '@app/interfaces/login.interface';
import { environment } from '@env/environment';
import { map, Observable, of, tap } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private httpClient: HttpClient) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    return this.httpClient.post<LoginResponse>(`${environment.serverUrl}/auth/login`, context).pipe(
      tap(({ access_token: token }) =>
        this.credentialsService.setCredentials({ username: context.username, token }, context.remember)
      ),
      map(({ access_token: token }) => ({ username: context.username, token }))
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
