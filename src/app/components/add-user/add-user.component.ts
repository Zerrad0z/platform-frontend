import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  addUserForm!: FormGroup;
  roles: Role[] = [];
  permissions: Permission[] = [];
  departmentId: number;
  emailExistsError: boolean = false; 

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private router: Router
  ) {
    this.departmentId = 1;
  }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      roles: [[], Validators.required],
      permissions: [[], Validators.required]
    });

    this.fetchRoles();
    this.fetchPermissions();
    this.fetchCurrentUserDepartmentId();
  }

  fetchRoles() {
    this.roleService.getAllRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  fetchPermissions() {
    this.permissionService.getAllPermissions().subscribe(permissions => {
      this.permissions = permissions;
    });
  }

  fetchCurrentUserDepartmentId() {
    this.userService.getCurrentUserDepartmentId().subscribe(departmentId => {
      this.departmentId = departmentId;
    });
  }

  checkEmailExists(): void {
    const email = this.addUserForm.get('email')?.value;
    if (email) {
        console.log('Checking email existence for:', email);
        this.userService.checkEmailExists(email).subscribe(exists => {
            console.log('Email exists:', exists);
            this.emailExistsError = exists;
            if (exists) {
                this.addUserForm.get('email')?.setErrors({ emailExists: true });
            }
        });
    }
}

  onSubmit(): void {
    if (this.addUserForm.valid && !this.emailExistsError) {
      const userDTO = this.addUserForm.value;
      this.userService.addUser(userDTO, this.departmentId).subscribe(
        response => {
          console.log('User added successfully', response);
          this.router.navigate(['/admin/dashboard']); 
        },
        error => {
          console.error('Error adding user', error);
          // Show error message to user
        }
      );
    } else {
      this.addUserForm.markAllAsTouched();
    }
  }
}