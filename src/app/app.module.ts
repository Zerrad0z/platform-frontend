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
import { DragDropModule } from '@angular/cdk/drag-drop'; // Import Angular CDK DragDropModule

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ApiComponent } from './components/api/api.component';
import { UserComponent } from './components/user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AuthorisationComponent } from './components/authorisation/authorisation.component';
import { DemandeAuthorisationComponent } from './components/demande-authorisation/demande-authorisation.component';
import { DemandeComponent } from './components/demande/demande.component';
import { LoginComponent } from './components/login/login.component';
import { PlatformInterceptor } from './interceptors/platform.interceptor';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserAuthorisationsComponent } from './components/user-authorisations/user-authorisations.component';
import { UserDemandesComponent } from './components/user-demandes/user-demandes.component';
import { EditEndDateDialogComponent } from './components/edit-end-date-dialog/edit-end-date-dialog.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { EditApiComponent } from './components/edit-api/edit-api.component';
import { ApidocumentationComponent } from './components/apidocumentation/apidocumentation.component';
import { ChangeNameDialogComponent } from './components/change-name-dialog/change-name-dialog.component';
import { ChangePasswordDialogComponent } from './components/change-password-dialog/change-password-dialog.component';
import { CloseAccountDialogComponent } from './components/close-account-dialog/close-account-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MatDividerModule } from '@angular/material/divider';
import { EditApiDialogComponent } from './components/edit-api-dialog/edit-api-dialog.component';
import { AddApiDialogComponent } from './components/add-api-dialog/add-api-dialog.component';
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { DeleteConfirmationDialComponent } from './components/delete-confirmation-dial/delete-confirmation-dial.component';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ApiComponent,
    UserComponent,
    HomeComponent,
    AuthorisationComponent,
    DemandeAuthorisationComponent,
    DemandeComponent,
    LoginComponent,
    NotAuthorizedComponent,
    AddUserComponent,
    ProfileComponent,
    UserAuthorisationsComponent,
    UserDemandesComponent,
    EditEndDateDialogComponent,
    EditUserComponent,
    RegistrationComponent,
    EditApiComponent,
    ApidocumentationComponent,
    ChangeNameDialogComponent,
    ChangePasswordDialogComponent,
    CloseAccountDialogComponent,
    EditApiDialogComponent,
    AddApiDialogComponent,
    DeleteConfirmationDialogComponent,
    DeleteConfirmationDialComponent
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
    MatSnackBarModule,
    DragDropModule,
    RecaptchaModule, 
    RecaptchaFormsModule, 
    MatProgressSpinnerModule, 
    MatDividerModule
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: PlatformInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
