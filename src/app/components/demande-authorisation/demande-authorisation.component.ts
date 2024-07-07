import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DemandeAuthorisationService } from 'src/app/services/demandeAuthorisation/demande-authorisation.service';
import { DemandeAuthorisation } from 'src/app/models/demandeAuthorisation.model';

@Component({
  selector: 'app-demande-authorisation',
  templateUrl: './demande-authorisation.component.html',
  styleUrls: ['./demande-authorisation.component.css']
})
export class DemandeAuthorisationComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description', 'username', 'apiName', 'startDate', 'endDate', 'actions'];
  dataSource = new MatTableDataSource<DemandeAuthorisation>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private demandeAuthorisationService: DemandeAuthorisationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.fetchAllDemandeAuthorisations();
  }

  fetchAllDemandeAuthorisations(): void {
    this.demandeAuthorisationService.getAllDemandeAuthorisations().subscribe(
      (data: DemandeAuthorisation[]) => {
        console.log('Fetched demandes:', data);
        console.log('Number of demandes:', data.length);
        
        data.forEach(demande => {
          console.log(`Demande ${demande.id}: approved=${demande.approved}, status=${demande.status}`);
        });

        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log('DataSource data:', this.dataSource.data);
        console.log('DataSource data length:', this.dataSource.data.length);

        this.cdr.detectChanges();

        // Check if the table is rendered
        setTimeout(() => {
          const tableRows = document.querySelectorAll('table tr');
          console.log('Number of table rows:', tableRows.length);
        }, 0);
      },
      error => {
        console.error('Error fetching demande authorisations:', error);
      }
    );
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

  approveDemande(id: number): void {
    console.log(`Approving demande with id: ${id}`);
    this.demandeAuthorisationService.approveDemande(id).subscribe(
      () => {
        console.log(`Demande ${id} approved successfully`);
        this.removeDemandeFromTable(id);
      },
      error => {
        console.error('Error approving demande:', error);
      }
    );
  }

  rejectDemande(id: number): void {
    console.log(`Rejecting demande with id: ${id}`);
    this.demandeAuthorisationService.rejectDemande(id).subscribe(
      () => {
        console.log(`Demande ${id} rejected successfully`);
        this.removeDemandeFromTable(id);
      },
      error => {
        console.error('Error rejecting demande:', error);
      }
    );
  }

  private removeDemandeFromTable(id: number): void {
    const index = this.dataSource.data.findIndex(demande => demande.id === id);
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }
  }
}