import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-close-account-dialog',
  template: `
    <h2 mat-dialog-title>Close Your Account</h2>
    <mat-dialog-content>
      <p class="warning-text">Warning: This action cannot be undone. All your data will be permanently deleted.</p>
      <form [formGroup]="closeAccountForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Enter your password to confirm</mat-label>
          <input matInput type="password" formControlName="password">
          <mat-error *ngIf="closeAccountForm.get('password')?.hasError('required')">Password is required to close your account</mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="warn" [disabled]="closeAccountForm.invalid" (click)="onConfirm()">Close Account</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width { width: 100%; }
    .warning-text { color: #f44336; font-weight: bold; margin-bottom: 20px; }
  `]
})
export class CloseAccountDialogComponent {
  closeAccountForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CloseAccountDialogComponent>,
    private fb: FormBuilder
  ) {
    this.closeAccountForm = this.fb.group({
      password: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.closeAccountForm.valid) {
      this.dialogRef.close(this.closeAccountForm.get('password')?.value);
    }
  }
}