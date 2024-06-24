import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api/api.service';
import { Api } from 'src/app/models/api.model';

@Component({
  selector: 'app-add-api',
  templateUrl: './add-api.component.html',
  styleUrls: ['./add-api.component.css']
})
export class AddApiComponent {
  api: Api = { id: 0, name: '', description: '', version: '', documentationName: '', documentationUrl: '' };

  constructor(private apiService: ApiService, private router: Router, private snackBar: MatSnackBar) {}

  addApi(): void {
    this.apiService.saveAPI(this.api).subscribe(
      response => {
        console.log('API added successfully');
        this.snackBar.open('API added successfully', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/admin/edit-apis']);
      },
      error => {
        console.error('Error adding API', error);
        this.snackBar.open('Error adding API', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
