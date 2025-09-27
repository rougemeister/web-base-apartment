import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './features/dashboard/admin-layout/admin-layout.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RoleGuard } from './core/guards/role.guard';
import { TenantLayoutComponent } from './features/dashboard/tenant-layout/tenant-layout.component';
import { LandlordLayoutComponent } from './features/dashboard/landlord-layout/landlord-layout.component';
import { LandlordDashboardComponent } from './features/dashboard/landlord-dashboard/landlord-dashboard.component';
import { TenantDashboardComponent } from './features/dashboard/tenant-dashboard/tenant-dashboard.component';
import { AdminDashboardComponent } from './features/dashboard/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: RegisterComponent
    },
    {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'tenant',
    component: TenantLayoutComponent,
    canActivate: [RoleGuard],
    data: { roles: ['tenant'] },
    children: [
      { path: 'dashboard', component: TenantDashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'landlord',
    component: LandlordLayoutComponent,
    canActivate: [RoleGuard],
    data: { roles: ['landlord'] },
    children: [
      { path: 'dashboard', component: LandlordDashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' },
 
];
