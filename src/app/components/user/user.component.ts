import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialComponent } from '../delete-confirmation-dial/delete-confirmation-dial.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchManageableUsers();
  }

  fetchManageableUsers(): void {
    this.userService.getManageableUsers().subscribe(
      (users: User[]) => {
        console.log('Fetched manageable users:', users);
        this.dataSource.data = users;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching manageable users:', error);
      }
    );
  }

  getRoleNames(user: User): string {
    return user.roles ? user.roles.map(role => role.name).join(', ') : 'N/A';
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editUser(user: User): void {
    this.router.navigate(['/admin/edit-user', user.id]);
  }

  confirmDeleteUser(user: User): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialComponent, {
      width: '250px',
      data: { userName: user.username }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(user.id);
      }
    });
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log('User deleted successfully');
        this.fetchManageableUsers(); // Refresh the table data
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}
