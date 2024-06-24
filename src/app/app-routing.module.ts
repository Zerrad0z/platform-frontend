import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { ApiComponent } from './components/api/api.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserDemandesComponent } from './components/user-demandes/user-demandes.component';
import { UserAuthorisationsComponent } from './components/user-authorisations/user-authorisations.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { authenticationGuard } from './guards/authentication.guard';
import { authorisationGuard } from './guards/authorisation.guard';
import { permissionGuard } from './guards/permission.guard';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AuthorisationComponent } from './components/authorisation/authorisation.component';
import { DemandeAuthorisationComponent } from './components/demande-authorisation/demande-authorisation.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserComponent } from './components/user/user.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AddApiComponent } from './components/add-api/add-api.component';
import { EditApiComponent } from './components/edit-api/edit-api.component';
import { roleRedirectionGuard } from './guards/role-redirection.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Correct redirection for root path
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authenticationGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'apis', component: ApiComponent, canActivate: [permissionGuard], data: { permission: 'BROWSE_APIS' } },
      { path: 'support', component: ApiComponent, canActivate: [permissionGuard], data: { permission: 'BROWSE_SUPPORT' } },
      { path: 'profile', component: ProfileComponent, canActivate: [permissionGuard], data: { permission: 'MANAGE_PROFILE' } },
      { path: 'demandes', component: UserDemandesComponent, canActivate: [permissionGuard], data: { permission: 'MAKE_DEMANDES' } },
      { path: 'subscriptions', component: UserAuthorisationsComponent, canActivate: [permissionGuard], data: { permission: 'CHECK_SUBSCRIPTIONS' } }
    ]
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [authenticationGuard, authorisationGuard],
    data: { roles: ['ADMIN', 'SUPERADMIN'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UserComponent },
      { path: 'approuves', component: AuthorisationComponent },
      { path: 'demandes', component: DemandeAuthorisationComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'edit-user/:id', component: EditUserComponent },
      { path: 'api-list', component: EditApiComponent, canActivate: [permissionGuard], data: { permission: 'MANAGE_APIS' } },
      { path: 'add-api', component: AddApiComponent, canActivate: [permissionGuard], data: { permission: 'MANAGE_APIS' } }
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
