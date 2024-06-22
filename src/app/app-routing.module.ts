import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from './components/api/api.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { AuthorisationComponent } from './components/authorisation/authorisation.component';
import { DemandeAuthorisationComponent } from './components/demande-authorisation/demande-authorisation.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { LoginComponent } from './components/login/login.component';
import { authenticationGuard } from './guards/authentication.guard';
import { authorisationGuard } from './guards/authorisation.guard';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'apis', component: ApiComponent },
      { path: 'support', component: ApiComponent },
      { path: 'profile', component: ProfileComponent}
    ]
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [authenticationGuard, authorisationGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UserComponent },
      { path: 'approuves', component: AuthorisationComponent },
      { path: 'demandes', component: DemandeAuthorisationComponent },
      { path: 'add-user', component: AddUserComponent }
    ]
  },
  { path: 'notAuthorized', component: NotAuthorizedComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
