import { Component, OnInit } from '@angular/core';
import { PropositionService } from '../../services/proposition.service';
import { UserService } from '../../services/user.service'; // Assuming a service for managing user authentication
import { Proposition } from '../../models/proposition';
import { UserStorageService } from 'src/app/services/Storage/user-storage.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver'; // Install file-saver: npm install file-saver


@Component({
  selector: 'app-proposition-list',
  templateUrl: './proposition-list.component.html',
  styleUrls: ['./proposition-list.component.css'],
})
export class PropositionListComponent implements OnInit {
  propositions: Proposition[] = [];
  currentUserId: number | any;
  isUserLoggedIn : boolean = UserStorageService.isUserLoggedIn();
  isAdminLoggedIn : boolean = UserStorageService.isAdminLoggedIn();

  constructor(
    private propositionService: PropositionService,
    private userService: UserService, // To get the logged-in user's ID
    private router:Router
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn = UserStorageService.isUserLoggedIn();
    this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    this.currentUserId = this.userService.getCurrentUserId(); // Fetch the current user's ID
  this.loadPropositions();
  }

  loadPropositions(): void {
    this.propositionService.getAllPropositions().subscribe(
      (data) => {
        this.propositions = data.filter((proposition) => proposition.status === true);
        console.log(data)
      },
      (error) => {
        console.error('Error loading propositions:', error);
      }
    );
  }

  canEditProposition(propositionUserId: number): boolean {
    return this.isAdminLoggedIn || propositionUserId === this.currentUserId;
  }


  /* editProposition(id: number): void {
    console.log('Editing proposition with ID:', id);
    // Redirect to an edit form or open a modal for editing
  } */

  editProposition(id: number): void {
    this.router.navigate(['/propositions/edit', id]);
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

  downloadFile(documentPath: string): void {
    // Extract only the file name from the path
    const fileName = documentPath.split('\\').pop() || documentPath;

    this.propositionService.downloadFile(fileName).subscribe({
      next: (blob) => {
        saveAs(blob, fileName); // Use the file name to save the downloaded file
        console.log('File downloaded successfully:', fileName);
        this.router.navigate(['/propositions']);
      },
      error: (err) => {
        console.error('Error downloading file:', err);
      },
    });
  }




}


