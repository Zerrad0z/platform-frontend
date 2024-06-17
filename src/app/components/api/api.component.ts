import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/app/services/api/api.service';
import { Api } from 'src/app/models/api.model';
import { MatDialog } from '@angular/material/dialog';
import { DemandeAuthorisationService } from 'src/app/services/demandeAuthorisation/demande-authorisation.service';
import { DemandeAuthorisation } from 'src/app/models/demandeAuthorisation.model';
import { DemandeComponent } from '../demande/demande.component';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Api>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private demandeAuthorisationService: DemandeAuthorisationService
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

  clearFilter(): void {
    const filterInput = document.querySelector('input[matInput]');
    if (filterInput) {
      (filterInput as HTMLInputElement).value = '';
      this.dataSource.filter = '';
    }
  }

  openDialog(apiId: number): void {
    const dialogRef = this.dialog.open(DemandeComponent, {
      width: '300px',
      data: { apiId }
    });

    dialogRef.afterClosed().subscribe((result: DemandeAuthorisation) => {
      if (result) {
        // Handle the form submission, e.g., send the data to the backend
        this.demandeAuthorisationService.createDemandeAuthorisation(result).subscribe(
          (response) => {
            console.log('Demande d\'authorisation created:', response);
            // Optionally, refresh the data or show a success message
          },
          (error) => {
            console.error('Error creating demande d\'authorisation:', error);
            // Handle the error, e.g., show an error message
          }
        );
      }
    });
  }
}