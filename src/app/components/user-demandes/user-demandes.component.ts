import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DemandeAuthorisationService } from 'src/app/services/demandeAuthorisation/demande-authorisation.service';
import { UserService } from 'src/app/services/user/user.service';
import { DemandeAuthorisation } from 'src/app/models/demandeAuthorisation.model';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-demandes',
  templateUrl: './user-demandes.component.html',
  styleUrls: ['./user-demandes.component.css']
})
export class UserDemandesComponent implements OnInit {
  displayedColumns: string[] = ['description', 'api', 'startDate', 'endDate', 'status'];
  dataSource = new MatTableDataSource<DemandeAuthorisation>();
  errorMessage: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private demandeAuthorisationService: DemandeAuthorisationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchUserPendingDemandes();
  }

  fetchUserPendingDemandes(): void {
    this.userService.getCurrentUser().pipe(
      switchMap(user => {
        console.log('Current user:', user);
        return this.demandeAuthorisationService.getDemandesByUserId(user.id);
      }),
      catchError(error => {
        console.error('Error fetching user or demandes:', error);
        this.errorMessage = 'An error occurred while fetching your demandes.';
        return of([]);
      })
    ).subscribe(
      demandes => {
        console.log('All user demandes:', demandes);
        const pendingDemandes = demandes.filter(demande => !demande.approved);
        console.log('Pending user demandes:', pendingDemandes);
        this.dataSource.data = pendingDemandes;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  getStatus(demande: DemandeAuthorisation): string {
    if (demande.approved === false) {
      return 'En attente';
    } else if (demande.approved === true) {
      return 'Approuvé';
    } else {
      return 'Statut inconnu';
    }
  }
}