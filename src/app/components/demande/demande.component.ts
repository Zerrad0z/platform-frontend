import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeAuthorisationService } from 'src/app/services/demandeAuthorisation/demande-authorisation.service';
import { UserService } from 'src/app/services/user/user.service';
import { DemandeAuthorisation } from 'src/app/models/demandeAuthorisation.model';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  form: FormGroup;
  demandes: DemandeAuthorisation[] = [];

  constructor(
    private fb: FormBuilder,
    private demandeAuthorisationService: DemandeAuthorisationService,
    private userService: UserService,
    public dialogRef: MatDialogRef<DemandeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { apiId: number }
  ) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      apiId: [data.apiId, Validators.required],
      userId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Fetch the current user ID and their demandes
    this.userService.getCurrentUser().subscribe(
      (user) => {
        this.form.patchValue({ userId: user.id });
        this.fetchUserDemandes(user.id);
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
  }

  fetchUserDemandes(userId: number): void {
    this.demandeAuthorisationService.getDemandesByUserId(userId).subscribe(
      (demandes) => {
        this.demandes = demandes;
      },
      (error) => {
        console.error('Error fetching user demandes', error);
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.demandeAuthorisationService.createDemandeAuthorisation(this.form.value).subscribe(
        (response) => {
          console.log('Demande d\'authorisation created:', response);
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error creating demande d\'authorisation:', error);
        }
      );
    }
  }
}
