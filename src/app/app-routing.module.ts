import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { ApiComponent } from './components/api/api.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserDemandesComponent } from './components/user-demandes/user-demandes.component';
import { UserAuthorisationsComponent } from './components/user-authorisations/user-authorisations.component';
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
import { EditApiComponent } from './components/edit-api/edit-api.component';
import { ApidocumentationComponent } from './components/apidocumentation/apidocumentation.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'notAuthorized', component: NotAuthorizedComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authenticationGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'apis', component: ApiComponent, canActivate: [permissionGuard], data: { permission: 'BROWSE_APIS' } },
      { path: 'support', component: ApiComponent, canActivate: [permissionGuard], data: { permission: 'BROWSE_SUPPORT' } },
      { path: 'profile', component: ProfileComponent, canActivate: [permissionGuard], data: { permission: 'MANAGE_PROFILE' } },
      { path: 'demandes', component: UserDemandesComponent, canActivate: [permissionGuard], data: { permission: 'MAKE_DEMANDES' } },
      { path: 'subscriptions', component: UserAuthorisationsComponent, canActivate: [permissionGuard], data: { permission: 'CHECK_SUBSCRIPTIONS' } },
      { path: 'documentation/:url', component: ApidocumentationComponent },
      {
        path: 'admin',
        canActivate: [authorisationGuard],
        data: { roles: ['ADMIN', 'USER_A', 'SUPERADMIN'] },
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'users', component: UserComponent, canActivate: [permissionGuard], data: { permission: 'MANAGE_USERS' } },
          { path: 'approuves', component: AuthorisationComponent, canActivate: [permissionGuard], data: { permission: 'MANAGE_SUBS' } },
          { path: 'demandes', component: DemandeAuthorisationComponent, canActivate: [permissionGuard], data: { permission: 'MANAGE_DEMANDS' } },
          { path: 'add-user', component: AddUserComponent, canActivate: [permissionGuard], data: { permission: 'ADD_USERS' } },
          { path: 'edit-user/:id', component: EditUserComponent, canActivate: [permissionGuard], data: { permission: 'EDIT_USERS' } },
          { path: 'api-list', component: EditApiComponent, canActivate: [permissionGuard], data: { permission: 'MANAGE_APIS' } },
        ]
      },
    ]
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
