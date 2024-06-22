import { Component, OnInit } from '@angular/core';
import { AuthorisationService } from 'src/app/services/authorisation/authorisation.service';
import { UserService } from 'src/app/services/user/user.service';
import { Authorisation } from 'src/app/models/authorisation.model';

@Component({
  selector: 'app-user-authorisations',
  templateUrl: './user-authorisations.component.html',
  styleUrls: ['./user-authorisations.component.css']
})
export class UserAuthorisationsComponent implements OnInit {
  authorisations: Authorisation[] = [];

  constructor(
    private authorisationService: AuthorisationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.authorisationService.getAuthorisationsByUserId(user.id).subscribe(authorisations => {
        this.authorisations = authorisations;
      });
    });
  }
}
