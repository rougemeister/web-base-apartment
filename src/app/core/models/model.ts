export interface User {
  _id?: string; // comes from MongoDB
  name: string;
  email: string;
  password?: string; // optional on frontend (don’t expose from API responses)
  role?: 'tenant' | 'landlord' | 'admin';
  createdAt?: string;
  updatedAt?: string;
}


export interface AuthResponse {
  token: string;
  user: User;
}