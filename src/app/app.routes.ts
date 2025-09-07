import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './features/admin-layout/admin-layout.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
    {
        path: 'admin',
        component: AdminLayoutComponent
    },
    {
        path: '',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
