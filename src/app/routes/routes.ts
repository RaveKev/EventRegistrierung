import { LayoutComponent } from '../layout/layout.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoverComponent } from './pages/recover/recover.component';
import { LockComponent } from './pages/lock/lock.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { Error404Component } from './pages/error404/error404.component';
import { Error500Component } from './pages/error500/error500.component';
import {AuthGuardService} from "../shared/security/auth-guard.service";

export const routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', redirectTo: 'seminars/overview', pathMatch: 'full', canActivate: [AuthGuardService] },
          { path: 'home', loadChildren: './home/home.module#HomeModule' , canActivate: [AuthGuardService] },
          { path: 'user', loadChildren: './user/user.module#UserModule', canActivate: [AuthGuardService] },
          { path: 'seminars', loadChildren: './seminars/seminars.module#SeminarsModule', canActivate: [AuthGuardService] },
          { path: 'administration', loadChildren: './administration/administration.module#AdministrationModule', canActivate: [AuthGuardService] },
          { path: 'booking', loadChildren: './booking/booking.module#BookingModule', canActivate: [AuthGuardService] },
        ]
    },

  // Not lazy-loaded routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recover', component: RecoverComponent },
  { path: 'lock', component: LockComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: '404', component: Error404Component },
  { path: '500', component: Error500Component },

  // Not found
    // Not found
    { path: '**', redirectTo: 'home' }

];
