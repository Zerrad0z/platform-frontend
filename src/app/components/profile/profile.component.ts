import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: User;
  errorMessage!: string;
  showApiKey: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (data: User) => {
        this.user = data;
        this.fetchApiKey();
      },
      (error) => {
        console.error('Error fetching user profile', error);
        this.errorMessage = 'Error fetching user profile';
      }
    );
  }

  fetchApiKey(): void {
    this.userService.getApiKey().subscribe(
      (apiKey: string) => {
        this.user.apiKey = apiKey;
      },
      (error: any) => {
        console.error('Error fetching API key', error);
      }
    );
  }

    toggleApiKeyVisibility() {
      this.showApiKey = !this.showApiKey;
    }

  getRoleNames(user: User): string {
    return user.roles ? user.roles.map(role => role.name).join(', ') : 'Loading...';
  }
}