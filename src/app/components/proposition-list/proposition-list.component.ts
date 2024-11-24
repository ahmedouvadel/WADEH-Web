import { Component, OnInit } from '@angular/core';
import { PropositionService } from '../../services/proposition.service';
import { UserService } from '../../services/user.service'; // Assuming a service for managing user authentication
import { Proposition } from '../../models/proposition';

@Component({
  selector: 'app-proposition-list',
  templateUrl: './proposition-list.component.html',
  styleUrls: ['./proposition-list.component.css'],
})
export class PropositionListComponent implements OnInit {
  propositions: Proposition[] = [];
  currentUserId: number | any;

  constructor(
    private propositionService: PropositionService,
    private userService: UserService // To get the logged-in user's ID
  ) {}

  ngOnInit(): void {
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
}
