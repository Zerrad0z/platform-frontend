import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthorisationService } from 'src/app/services/authorisation/authorisation.service';
import { UserService } from 'src/app/services/user/user.service';
import { Authorisation } from 'src/app/models/authorisation.model';

@Component({
  selector: 'app-user-authorisations',
  templateUrl: './user-authorisations.component.html',
  styleUrls: ['./user-authorisations.component.css']
})
export class UserAuthorisationsComponent implements OnInit {
  displayedColumns: string[] = ['apiId', 'startDate', 'endDate', 'status'];
  dataSource: MatTableDataSource<Authorisation>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authorisationService: AuthorisationService,
    private userService: UserService
  ) {
    this.dataSource = new MatTableDataSource<Authorisation>([]);
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.authorisationService.getAuthorisationsByUserId(user.id).subscribe(authorisations => {
        this.dataSource.data = authorisations;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}