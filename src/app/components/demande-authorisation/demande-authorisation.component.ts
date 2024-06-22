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
  displayedColumns: string[] = ['id', 'description', 'username', 'apiName', 'startDate', 'endDate', 'approved', 'actions'];
  dataSource = new MatTableDataSource<DemandeAuthorisation>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private demandeAuthorisationService: DemandeAuthorisationService) { }

  ngOnInit(): void {
    this.fetchDemandeAuthorisations();
  }

  fetchDemandeAuthorisations(): void {
    this.demandeAuthorisationService.getAllDemandeAuthorisations().subscribe((data: DemandeAuthorisation[]) => {
      console.log('Fetched demandes:', data); // Debugging line
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.error('Error fetching demande authorisations:', error);
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

  approveDemande(id: number): void {
    this.demandeAuthorisationService.approveDemande(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(demande => demande.id !== id);
    }, error => {
      console.error('Error approving demande:', error);
    });
  }

  rejectDemande(id: number): void {
    this.demandeAuthorisationService.rejectDemande(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(demande => demande.id !== id);
    }, error => {
      console.error('Error refusing demande:', error);
    });
  }
}
