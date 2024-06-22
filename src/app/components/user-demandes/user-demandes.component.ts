import { Component, OnInit } from '@angular/core';
import { DemandeAuthorisationService } from 'src/app/services/demandeAuthorisation/demande-authorisation.service';
import { UserService } from 'src/app/services/user/user.service';
import { DemandeAuthorisation } from 'src/app/models/demandeAuthorisation.model';

@Component({
  selector: 'app-user-demandes',
  templateUrl: './user-demandes.component.html',
  styleUrls: ['./user-demandes.component.css']
})
export class UserDemandesComponent implements OnInit {
  demandes: DemandeAuthorisation[] = [];

  constructor(
    private demandeAuthorisationService: DemandeAuthorisationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.demandeAuthorisationService.getDemandesByUserId(user.id).subscribe(demandes => {
        this.demandes = demandes;
      });
    });
  }
}
