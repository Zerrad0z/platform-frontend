import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/app/services/api/api.service';
import { Api } from 'src/app/models/api.model';
import { MatDialog } from '@angular/material/dialog';
import { DemandeAuthorisationService } from 'src/app/services/demandeAuthorisation/demande-authorisation.service';
import { DemandeComponent } from '../demande/demande.component';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'service', 'actions'];
  dataSource = new MatTableDataSource<Api>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private demandeAuthorisationService: DemandeAuthorisationService
  ) { }

  ngOnInit(): void {
    console.log('ApiComponent initialized');
    this.fetchUnauthorizedApis();
  }
  
  fetchUnauthorizedApis(): void {
    this.apiService.getAllUnauthorizedAPIs().subscribe(
      (data: Api[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Error fetching unauthorized APIs:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(apiId: number): void {
    const dialogRef = this.dialog.open(DemandeComponent, {
      width: '300px',
      data: { apiId }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.demandeAuthorisationService.createDemandeAuthorisation(result).subscribe(
          (response) => {
            console.log('Demande d\'authorisation created:', response);
            alert('Demande envoyée');
            this.fetchUnauthorizedApis();
          },
          (error) => {
            console.error('Error creating demande d\'authorisation:', error);
            alert('Failed to create demande');
          }
        );
      }
    });
  }

  openDocumentation(documentationUrl: string) {
    window.open(documentationUrl, '_blank');
  }
}