import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthedGuard } from './guards/authed.guard';

import { DashboardComponent, 
         HomeComponent, 
         LoginComponent, 
         RegisterComponent } from './pages';

const routes: Routes = 
[
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthedGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
