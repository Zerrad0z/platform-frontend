import { Component, OnInit, ViewChild } from '@angular/core';
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
  displayedColumns: string[] = ['id', 'description', 'username', 'apiName', 'startDate', 'endDate', 'status', 'actions'];
  dataSource = new MatTableDataSource<DemandeAuthorisation>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private demandeAuthorisationService: DemandeAuthorisationService) { }

  ngOnInit(): void {
    this.fetchDemandeAuthorisations();
  }

  fetchDemandeAuthorisations(): void {
    this.demandeAuthorisationService.getAllDemandeAuthorisations().subscribe(
      (data: DemandeAuthorisation[]) => {
        console.log('Fetched demandes:', data); // Debugging line
        data.forEach(demande => console.log(`Demande ID: ${demande.id}, Status: ${demande.status}`)); // Debugging line

        // Filter out non-pending demandes
        this.dataSource.data = data.filter(demande => demande.status === 'PENDING');
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
    console.log(`Approving demande with id: ${id}`); // Debugging line
    this.demandeAuthorisationService.approveDemande(id).subscribe(() => {
      this.updateDemandeStatus(id, 'APPROVED');
    }, error => {
      console.error('Error approving demande:', error);
    });
  }

  rejectDemande(id: number): void {
    console.log(`Rejecting demande with id: ${id}`); // Debugging line
    this.demandeAuthorisationService.rejectDemande(id).subscribe(() => {
      this.updateDemandeStatus(id, 'REJECTED');
    }, error => {
      console.error('Error rejecting demande:', error);
    });
  }

  updateDemandeStatus(id: number, status: string): void {
    console.log(`Updating status for demande with id: ${id} to ${status}`); // Debugging line
    const demandeIndex = this.dataSource.data.findIndex(demande => demande.id === id);
    if (demandeIndex > -1) {
      this.dataSource.data[demandeIndex].status = status;

      // Remove the demande from the table if it's no longer pending
      if (status !== 'PENDING') {
        this.dataSource.data.splice(demandeIndex, 1);
        this.dataSource._updateChangeSubscription(); // Refresh the table
      }
    }
  }
}
