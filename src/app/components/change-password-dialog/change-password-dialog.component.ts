import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password-dialog',
  template: `
    <h2 mat-dialog-title>Change Your Password</h2>
    <mat-dialog-content>
      <form [formGroup]="passwordForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Current Password</mat-label>
          <input matInput type="password" formControlName="oldPassword">
          <mat-error *ngIf="passwordForm.get('oldPassword')?.hasError('required')">Current password is required</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>New Password</mat-label>
          <input matInput type="password" formControlName="newPassword">
          <mat-error *ngIf="passwordForm.get('newPassword')?.hasError('required')">New password is required</mat-error>
          <mat-error *ngIf="passwordForm.get('newPassword')?.hasError('minlength')">Password must be at least 8 characters long</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Confirm New Password</mat-label>
          <input matInput type="password" formControlName="confirmPassword">
          <mat-error *ngIf="passwordForm.get('confirmPassword')?.hasError('required')">Please confirm your new password</mat-error>
          <mat-error *ngIf="passwordForm.hasError('passwordMismatch')">Passwords do not match</mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" [disabled]="passwordForm.invalid" (click)="onSave()">Change Password</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width { width: 100%; }
    mat-form-field { margin-bottom: 15px; }
  `]
})
export class ChangePasswordDialogComponent {
  passwordForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private fb: FormBuilder
  ) {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : { 'passwordMismatch': true };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.passwordForm.valid) {
      this.dialogRef.close({
        oldPassword: this.passwordForm.get('oldPassword')?.value,
        newPassword: this.passwordForm.get('newPassword')?.value
      });
    }
  }
}