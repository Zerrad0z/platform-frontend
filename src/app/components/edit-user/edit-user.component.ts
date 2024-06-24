import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { UserService } from 'src/app/services/user/user.service';
import { RoleService } from 'src/app/services/role/role.service';
import { PermissionService } from 'src/app/services/permission/permission.service';
import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';
import { Permission } from 'src/app/models/permission.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User = {
    id: 0,
    username: '',
    email: '',
    password: '',
    roles: [],
    permissions: [],
    apiKey: ''
  };
  allRoles: Role[] = [];
  allPermissions: Permission[] = [];
  departmentId: number = 1; // Assuming you have a way to get the department ID of the current user

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.fetchUser(+userId);
      this.fetchAllRoles();
      this.fetchAllPermissions();
    }
  }

  fetchUser(userId: number): void {
    this.userService.getUserById(userId, this.departmentId).subscribe(
      (user: User) => {
        this.user = user;
        this.filterAvailableRolesAndPermissions();
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  fetchAllRoles(): void {
    this.roleService.getAllRoles().subscribe(
      (roles: Role[]) => {
        this.allRoles = roles;
        this.filterAvailableRolesAndPermissions();
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  fetchAllPermissions(): void {
    this.permissionService.getAllPermissions().subscribe(
      (permissions: Permission[]) => {
        this.allPermissions = permissions;
        this.filterAvailableRolesAndPermissions();
      },
      (error) => {
        console.error('Error fetching permissions:', error);
      }
    );
  }

  filterAvailableRolesAndPermissions(): void {
    this.allRoles = this.allRoles.filter(role => !this.user.roles.some(userRole => userRole.id === role.id));
    this.allPermissions = this.allPermissions.filter(permission => !this.user.permissions.some(userPermission => userPermission.id === permission.id));
  }

  dropRole(event: CdkDragDrop<Role[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  dropPermission(event: CdkDragDrop<Permission[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  saveChanges(): void {
    this.userService.updateUser(this.user, this.departmentId).subscribe(
      () => {
        console.log('User updated successfully');
        this.router.navigate(['/admin/users']);
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/admin/users']);
  }
}