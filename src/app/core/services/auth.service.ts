import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse, User } from '../models/model';
import { decodeToken, DecodedToken } from '../utils/jwt.util';
import { JwtInterceptor } from '../interceptors/jwt.interceptor';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private BASE_URL = 'http://localhost:3000/api/auth'; 
  private TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient) {}

  register(user: Partial<User>): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/register`, user).pipe(
      tap((res) => this.storeAuth(res))
    );
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/login`, credentials).pipe(
      tap((res) => this.storeAuth(res))
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /** ✅ Checks if a user is logged in */
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decoded: DecodedToken | null = decodeToken(token);
    if (!decoded) return false;

    // Check if token expired
    const now = Date.now().valueOf() / 1000;
    return decoded.exp > now;
  }

  /** ✅ Get logged in user role */
  getUserRole(): 'tenant' | 'landlord' | 'admin' | null {
    const token = this.getToken();
    if (!token) return null;
    const decoded = decodeToken(token);
    console.log('Decoded token:', decoded?.role);
    return decoded?.role ?? null;
  }

  private storeAuth(res: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, res.token);
  }
}
