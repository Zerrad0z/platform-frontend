import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';



import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ApiComponent } from './components/api/api.component';
import { UserComponent } from './components/user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthorisationComponent } from './components/authorisation/authorisation.component';
import { DemandeAuthorisationComponent } from './components/demande-authorisation/demande-authorisation.component';
import { DemandeComponent } from './components/demande/demande.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { LoginComponent } from './components/login/login.component';
import { PlatformInterceptor } from './interceptors/platform.interceptor';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserAuthorisationsComponent } from './components/user-authorisations/user-authorisations.component';
import { UserDemandesComponent } from './components/user-demandes/user-demandes.component';
import { EditEndDateDialogComponent } from './components/edit-end-date-dialog/edit-end-date-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ApiComponent,
    UserComponent,
    HomeComponent,
    DashboardComponent,
    AuthorisationComponent,
    DemandeAuthorisationComponent,
    DemandeComponent,
    AdministrationComponent,
    LoginComponent,
    NotAuthorizedComponent,
    AddUserComponent,
    ProfileComponent,
    UserAuthorisationsComponent,
    UserDemandesComponent,
    EditEndDateDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatTableModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatCardModule,
    AppRoutingModule,
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule 
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: PlatformInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
