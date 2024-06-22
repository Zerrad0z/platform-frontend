import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { RoleService } from 'src/app/services/role/role.service';
import { PermissionService } from 'src/app/services/permission/permission.service';
import { Role } from 'src/app/models/role.model';
import { Permission } from 'src/app/models/permission.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  roles: Role[] = [];
  permissions: Permission[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private permissionService: PermissionService
  ) {
    this.addUserForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      apiKey: [''],
      roles: [[]],
      permissions: [[]]
    });
  }

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe((roles) => {
      this.roles = roles;
    });

    this.permissionService.getAllPermissions().subscribe((permissions) => {
      this.permissions = permissions;
    });
  }

  onSubmit(): void {
    const formValues = this.addUserForm.value;
    const userDTO = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      apiKey: formValues.apiKey,
      roles: formValues.roles.map((role: Role) => ({ id: role.id, name: role.name })),
      permissions: formValues.permissions.map((permission: Permission) => ({ id: permission.id, name: permission.name }))
    };
  
    this.userService.addUser(userDTO).subscribe({
      next: (response) => {
        console.log('User added successfully', response);
      },
      error: (error) => {
        console.error('Error adding user', error);
      }
    });
  }
}