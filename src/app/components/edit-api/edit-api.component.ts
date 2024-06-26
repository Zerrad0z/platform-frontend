import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api/api.service';
import { Api } from 'src/app/models/api.model';
import { EditApiDialogComponent } from '../edit-api-dialog/edit-api-dialog.component';
import { AddApiDialogComponent } from '../add-api-dialog/add-api-dialog.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-edit-api',
  templateUrl: './edit-api.component.html',
  styleUrls: ['./edit-api.component.css']
})
export class EditApiComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Api>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchApis();
  }

  fetchApis(): void {
    this.apiService.getAllAPIs().subscribe((data: Api[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.error('Error fetching APIs:', error);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editApi(api: Api): void {
    const dialogRef = this.dialog.open(EditApiDialogComponent, {
      width: '500px',
      data: {...api}
    });

    dialogRef.afterClosed().subscribe((result: Partial<Api> | undefined) => {
      if (result) {
        this.apiService.updateAPI({...api, ...result}).subscribe(
          (updatedApi: Api) => {
            const index = this.dataSource.data.findIndex(a => a.id === updatedApi.id);
            if (index !== -1) {
              this.dataSource.data[index] = updatedApi;
              this.dataSource._updateChangeSubscription();
              this.snackBar.open('API updated successfully', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              });
            }
          },
          (error: any) => {
            console.error('Error updating API:', error);
            this.snackBar.open('Error updating API. Please try again.', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }
        );
      }
    });
  }

  addNewApi(): void {
    const dialogRef = this.dialog.open(AddApiDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: Partial<Api> | undefined) => {
      if (result) {
        this.apiService.saveAPI(result as Api).subscribe(
          (newApi: Api) => {
            this.dataSource.data = [...this.dataSource.data, newApi];
            this.snackBar.open('New API added successfully', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          },
          (error: any) => {
            console.error('Error adding new API:', error);
            this.snackBar.open('Error adding new API. Please try again.', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }
        );
      }
    });
  }

  deleteApi(api: Api): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
      data: { apiName: api.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.deleteAPI(api.id).subscribe(
          () => {
            this.dataSource.data = this.dataSource.data.filter(a => a.id !== api.id);
            this.snackBar.open('API deleted successfully', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          },
          (error: any) => {
            console.error('Error deleting API:', error);
            this.snackBar.open('Error deleting API. Please try again.', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }
        );
      }
    });
  }
}