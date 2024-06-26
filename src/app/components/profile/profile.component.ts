import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ChangeNameDialogComponent } from '../change-name-dialog/change-name-dialog.component';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { CloseAccountDialogComponent } from '../close-account-dialog/close-account-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: User;
  errorMessage!: string;
  showApiKey: boolean = false;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getCurrentUser().subscribe(
      (data: User) => {
        this.user = data;
        this.fetchApiKey();
      },
      (error) => {
        console.error('Error fetching user profile', error);
        this.errorMessage = 'Error fetching user profile';
      }
    );
  }

  fetchApiKey(): void {
    this.userService.getApiKey().subscribe(
      (apiKey: string) => {
        this.user.apiKey = apiKey;
      },
      (error: any) => {
        console.error('Error fetching API key', error);
      }
    );
  }

  toggleApiKeyVisibility() {
    this.showApiKey = !this.showApiKey;
  }

  getRoleNames(user: User): string {
    return user.roles ? user.roles.map(role => role.name).join(', ') : 'Loading...';
  }

  openChangeNameDialog(): void {
    const dialogRef = this.dialog.open(ChangeNameDialogComponent, {
      width: '400px',
      data: { currentName: this.user.username }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.trim() !== '') { 
        this.userService.updateUsername(this.user.id, result).subscribe(
          () => {
            this.user.username = result;
            this.snackBar.open('Username updated successfully', 'Close', { duration: 3000 });
          },
          error => {
            console.error('Error updating username', error);
            this.snackBar.open('Failed to update username', 'Close', { duration: 3000 });
          }
        );
      }
    });
  }

  openChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.changePassword(this.user.id, result.oldPassword, result.newPassword).subscribe(
          () => {
            console.log('Password changed successfully');
          },
          error => {
            console.error('Error changing password', error);
          }
        );
      }
    });
  }

  openCloseAccountDialog(): void {
    const dialogRef = this.dialog.open(CloseAccountDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.closeAccount(this.user.id, result).subscribe(
          () => {
            console.log('Account closed successfully');
            // Implement logout and redirect to home page
          },
          error => {
            console.error('Error closing account', error);
          }
        );
      }
    });
  }

  copyApiKey(): void {
    if (this.user && this.user.apiKey) {
      navigator.clipboard.writeText(this.user.apiKey).then(() => {
        this.snackBar.open('API Key copied to clipboard', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }, (err) => {
        console.error('Could not copy text: ', err);
        this.snackBar.open('Failed to copy API Key', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      });
    }
  }
}