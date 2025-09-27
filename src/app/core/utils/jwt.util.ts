import {jwtDecode} from 'jwt-decode';

export interface DecodedToken {
  id: string;
  role: 'tenant' | 'landlord' | 'admin';
  exp: number;
}

export function decodeToken(token: string): DecodedToken | null {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
}
