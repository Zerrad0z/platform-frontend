import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent {
  demandeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DemandeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.demandeForm = this.fb.group({
      dateDe: ['', Validators.required],
      dateA: ['', Validators.required],
      description: ['', Validators.required],
      apiId: [data.apiId] // Bind the apiId from the dialog data
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.demandeForm.valid) {
      this.dialogRef.close(this.demandeForm.value);
    }
  }
}
