import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'edit'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    const departmentId = 1; // Assuming you have a way to get the department ID of the current user
    this.userService.getAllUsers(departmentId).subscribe(
      (users: User[]) => {
        this.dataSource.data = users;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.fetchRolesForUsers(users);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  fetchRolesForUsers(users: User[]): void {
    const departmentId = 1; // Assuming you have a way to get the department ID of the current user
    users.forEach(user => {
      this.userService.getUserRoles(user.id, departmentId).subscribe(
        (roles: Role[]) => {
          user.roles = roles;
          this.dataSource.data = [...this.dataSource.data]; // Trigger change detection
        },
        (error) => {
          console.error(`Error fetching roles for user ${user.id}:`, error);
        }
      );
    });
  }

  getRoleNames(user: User): string {
    return user.roles ? user.roles.map(role => role.name).join(', ') : 'Loading...';
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editUser(user: User): void {
    this.router.navigate(['/admin/edit-user', user.id]);
  }
}