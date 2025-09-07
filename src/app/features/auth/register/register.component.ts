import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
   name = '';
  email = '';
  password = '';
  role: 'tenant' | 'landlord' = 'tenant';
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private auth: AuthService) {}

  onRegister() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe({
      next: (res) => {
        console.log('Registered:', res);
        this.isLoading = false;
        this.successMessage = 'Account created successfully! Please check your email to verify your account.';
        // Reset form after successful registration
        setTimeout(() => {
          this.resetForm();
        }, 2000);
      },
      error: (err) => {
        console.error('Error:', err);
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }

  private resetForm() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.role = 'tenant';
    this.successMessage = '';
    this.errorMessage = '';
  }
}

