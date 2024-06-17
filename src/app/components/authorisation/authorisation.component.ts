// src/app/components/approuves/approuves.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthorisationService } from 'src/app/services/authorisation/authorisation.service';
import { Authorisation } from 'src/app/models/authorisation.model';

@Component({
  selector: 'app-approuves',
  templateUrl: './authorisation.component.html',
  styleUrls: ['./authorisation.component.css']
})
export class AuthorisationComponent implements OnInit {
  displayedColumns: string[] = ['authorisationId', 'userId', 'apiId', 'startDate', 'endDate', 'status'];
  dataSource = new MatTableDataSource<Authorisation>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authorisationService: AuthorisationService) { }

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
}
