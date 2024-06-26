import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Api } from 'src/app/models/api.model';

@Component({
  selector: 'app-edit-api-dialog',
  template: `
    <h2 mat-dialog-title>Edit API</h2>
    <mat-dialog-content>
      <form [formGroup]="apiForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" placeholder="Enter API name">
          <mat-error *ngIf="apiForm.get('name')?.hasError('required')">Name is required</mat-error>
        </mat-form-field>
        
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" placeholder="Enter API description"></textarea>
          <mat-error *ngIf="apiForm.get('description')?.hasError('required')">Description is required</mat-error>
        </mat-form-field>
        
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Version</mat-label>
          <input matInput formControlName="version" placeholder="Enter API version">
          <mat-error *ngIf="apiForm.get('version')?.hasError('required')">Version is required</mat-error>
        </mat-form-field>
        
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Documentation Name</mat-label>
          <input matInput formControlName="documentationName" placeholder="Enter documentation name">
        </mat-form-field>
        
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Documentation URL</mat-label>
          <input matInput formControlName="documentationUrl" placeholder="Enter documentation URL">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" [disabled]="apiForm.invalid" (click)="onSave()">Save Changes</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width { width: 100%; }
    mat-form-field { margin-bottom: 15px; }
  `]
})
export class EditApiDialogComponent {
  apiForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditApiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Api,
    private fb: FormBuilder
  ) {
    this.apiForm = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      version: [data.version, Validators.required],
      documentationName: [data.documentationName],
      documentationUrl: [data.documentationUrl]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.apiForm.valid) {
      this.dialogRef.close(this.apiForm.value);
    }
  }
}