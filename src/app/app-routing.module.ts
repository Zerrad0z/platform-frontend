import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from './components/api/api.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthorisationComponent } from './components/authorisation/authorisation.component';
import { DemandeAuthorisationComponent } from './components/demande-authorisation/demande-authorisation.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'apis', component: ApiComponent },
  { path: 'support', component: ApiComponent }, 
  { path: 'profile', component: UserComponent },
  { path: 'login', component: UserComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path : 'users', component: UserComponent},
  { path: 'approuves', component: AuthorisationComponent },
  { path: 'demandes', component: DemandeAuthorisationComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
