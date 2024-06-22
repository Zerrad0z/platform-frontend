// src/app/components/authorisation/authorisation.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AuthorisationService } from 'src/app/services/authorisation/authorisation.service';
import { Authorisation } from 'src/app/models/authorisation.model';
import { EditEndDateDialogComponent } from '../edit-end-date-dialog/edit-end-date-dialog.component';

@Component({
  selector: 'app-authorisation',
  templateUrl: './authorisation.component.html',
  styleUrls: ['./authorisation.component.css']
})
export class AuthorisationComponent implements OnInit {
  displayedColumns: string[] = ['username', 'apiName', 'startDate', 'endDate', 'status', 'edit'];
  dataSource = new MatTableDataSource<Authorisation>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authorisationService: AuthorisationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchAuthorisations();
  }

  fetchAuthorisations(): void {
    this.authorisationService.getAllAuthorisations().subscribe((data: Authorisation[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.error('Error fetching authorisations:', error);
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

  openEditEndDateDialog(authorisation: Authorisation): void {
    const dialogRef = this.dialog.open(EditEndDateDialogComponent, {
      width: '300px',
      data: { endDate: authorisation.endDate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newEndDate = result.endDate;
        this.authorisationService.updateEndDate(authorisation.authorisationId, newEndDate).subscribe(
          () => {
            authorisation.endDate = newEndDate;
          },
          error => {
            console.error('Error updating end date:', error);
          }
        );
      }
    });
  }

  updateStatus(authorisation: Authorisation, status: boolean): void {
    this.authorisationService.updateStatus(authorisation.authorisationId, status).subscribe(
      () => {
        authorisation.status = status;
      },
      error => {
        console.error('Error updating status:', error);
      }
    );
  }
}
