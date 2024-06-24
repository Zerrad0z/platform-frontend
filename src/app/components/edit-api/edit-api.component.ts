import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api/api.service';
import { Api } from 'src/app/models/api.model';

@Component({
  selector: 'app-edit-api',
  templateUrl: './edit-api.component.html',
  styleUrls: ['./edit-api.component.css']
})
export class EditApiComponent implements OnInit {
  api: Api = { id: 0, name: '', description: '', version: '', documentationName: '', documentationUrl: '' };
  apiId: number = 0;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.apiId = +this.route.snapshot.paramMap.get('id')!;
    if (this.apiId) {
      this.apiService.getAPIById(this.apiId).subscribe(
        response => {
          this.api = response;
        },
        error => {
          console.error('Error fetching API details', error);
          this.snackBar.open('Error fetching API details', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }

  saveApi(): void {
    this.apiService.saveAPI(this.api).subscribe(
      response => {
        console.log('API updated successfully');
        this.snackBar.open('API updated successfully', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/admin/api-list']);
      },
      error => {
        console.error('Error updating API', error);
        this.snackBar.open('Error updating API', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
