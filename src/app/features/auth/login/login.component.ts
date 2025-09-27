import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // ✅ fixed typo: should be "styleUrls"
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.error = '';

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.isLoading = false;

        // ✅ get role from AuthService
        const role = this.auth.getUserRole();
        console.log('User role:', role);

        if (role === 'admin') {
          this.router.navigate(['admin/dashboard']);
        } else if (role === 'landlord') {
          this.router.navigate(['landlord/dashboard']);
        } else {
          this.router.navigate(['tenant/dashboard']);
        }
// Temporary: redirect to admin dashboard
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.message || 'Login failed';
      }
    });
  }

  loginWithGoogle() {
    // Implement Google OAuth login here
    console.log('Google login clicked');
  }
}
