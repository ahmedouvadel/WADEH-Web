import { Component, OnInit } from '@angular/core';
import { Proposition } from 'src/app/models/proposition';
import { PropositionService } from 'src/app/services/proposition.service';
import { UserStorageService } from 'src/app/services/Storage/user-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  message(message: any) {
    throw new Error('Method not implemented.');
  }
  propositions: Proposition[] = [];
  currentUserId: number | any;
  isAgentLoggedIn : boolean = UserStorageService.isUserLoggedIn();
  isAdminLoggedIn : boolean = UserStorageService.isAdminLoggedIn();

  constructor(
    private propositionService: PropositionService,
    private userService: UserService // To get the logged-in user's ID
  ) {}

  ngOnInit(): void {
    this.isAgentLoggedIn = UserStorageService.isUserLoggedIn();
    this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    this.currentUserId = this.userService.getCurrentUserId(); // Fetch the current user's ID
    this.loadPropositions();
  }




  loadPropositions(): void {
    this.propositionService.getAllPropositions().subscribe(
      (data) => {
        this.propositions = data;
        console.log(data)
      },
      (error) => {
        console.error('Error loading propositions:', error);
      }
    );
  }

  editProposition(id: number): void {
    console.log('Editing proposition with ID:', id);
    // Redirect to an edit form or open a modal for editing
  }

  deleteProposition(id: number): void {
    if (this.currentUserId !== null) {
      this.propositionService.deleteProposition(id, this.currentUserId).subscribe(
        () => {
          this.propositions = this.propositions.filter((p) => p.id !== id);
        },
        (error) => {
          console.error('Error deleting proposition:', error);
        }
      );
    } else {
      console.error('User not authenticated.');
    }
  }

  validateProposition(id: number): void {
    this.propositionService.validateProposition(id).subscribe(
      (updatedProposition) => {
        console.log('Proposition validated:', updatedProposition);
        // Update the proposition in the local list
        const index = this.propositions.findIndex((p) => p.id === id);
        if (index !== -1) {
          this.propositions[index].status = true;
        }
      },
      (error) => {
        console.error('Error validating proposition:', error);
      }
    );
  }

  loadValidatedPropositions(): void {
    this.propositionService.getValidatedPropositions().subscribe(
      (data) => {
        this.propositions = data;
      },
      (error) => {
        console.error('Error loading validated propositions:', error);
      }
    );
  }

}

