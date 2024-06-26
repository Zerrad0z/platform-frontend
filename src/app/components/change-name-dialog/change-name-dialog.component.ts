import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-name-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.currentName ? 'Change' : 'Set' }} Username</h2>
    <mat-dialog-content>
      <form [formGroup]="nameForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>New Username</mat-label>
          <input matInput formControlName="newName" placeholder="Enter your new username">
          <mat-error *ngIf="nameForm.get('newName')?.hasError('required')">Username is required</mat-error>
          <mat-error *ngIf="nameForm.get('newName')?.hasError('minlength')">Username must be at least 3 characters long</mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" [disabled]="nameForm.invalid" (click)="onSave()">Save Changes</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width { width: 100%; }
    mat-form-field { margin-bottom: 15px; }
    ::ng-deep .mat-form-field-appearance-outline .mat-form-field-infix {
      padding-top: 0.5em;
      padding-bottom: 1em;
    }
    ::ng-deep .mat-form-field-appearance-outline .mat-form-field-label {
      top: 1.84375em;
      margin-top: -0.25em;
    }
    ::ng-deep .mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label {
      transform: translateY(-1.400em) scale(0.75);
      width: 133.33333%;
    }
  `]
})
export class ChangeNameDialogComponent {
  nameForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ChangeNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentName: string },
    private fb: FormBuilder
  ) {
    this.nameForm = this.fb.group({
      newName: [this.data.currentName || '', [Validators.required, Validators.minLength(3)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.nameForm.valid) {
      this.dialogRef.close(this.nameForm.get('newName')?.value);
    }
  }
}