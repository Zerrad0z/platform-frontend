import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedRole: Role | null = null;
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
        if (user.roles.length > 0) {
          this.selectedRole = user.roles[0];
          this.updatePermissionChecks();
        }
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
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  fetchAllPermissions(): void {
    this.permissionService.getAllPermissions().subscribe(
      (permissions: Permission[]) => {
        this.allPermissions = permissions.map(p => ({...p, checked: false}));
        this.updatePermissionChecks();
      },
      (error) => {
        console.error('Error fetching permissions:', error);
      }
    );
  }

  updatePermissionChecks(): void {
    if (this.selectedRole && this.allPermissions.length > 0) {
      const rolePermissions = this.selectedRole.permissions || [];
      this.allPermissions.forEach(permission => {
        permission.checked = rolePermissions.some((p: Permission) => p.id === permission.id) || 
                             this.user.permissions.some(p => p.id === permission.id);
      });
    }
  }

  onRoleChange(): void {
    this.updatePermissionChecks();
  }

  togglePermission(permission: Permission): void {
    permission.checked = !permission.checked;
  }

  saveChanges(): void {
    this.user.roles = [this.selectedRole!];
    this.user.permissions = this.allPermissions.filter(p => p.checked);
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