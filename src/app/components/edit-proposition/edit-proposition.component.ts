import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropositionService } from '../../services/proposition.service';
import { Proposition } from '../../models/proposition';

@Component({
  selector: 'app-edit-proposition',
  templateUrl: './edit-proposition.component.html',
  styleUrls: ['./edit-proposition.component.css'],
})
export class EditPropositionComponent implements OnInit {
  proposition: Proposition | null = null;
  currentUserId: number | null = null;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propositionService: PropositionService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.currentUserId = Number(localStorage.getItem('userId')); // Retrieve userId from localStorage

    if (id) {
      this.propositionService.getPropositionById(id).subscribe({
        next: (data) => (this.proposition = data),
        error: (err) => console.error('Error fetching proposition:', err),
      });
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.proposition && this.currentUserId) {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('title', this.proposition.title);
        formData.append('userId', this.currentUserId.toString());
        formData.append('file', this.selectedFile);

        this.propositionService.updateProposition(this.proposition.id, this.currentUserId, formData).subscribe({
          next: () => {
            alert('Proposition mise à jour avec succès ! Le statut est maintenant en attente de validation.');
            this.router.navigate(['/propositions']);
          },
          error: (err) => {
            console.error('Error updating proposition:', err);
          },
        });
      } else {
        const updatedProposition: Partial<Proposition> = {
          title: this.proposition.title,
        };

        this.propositionService.updateProposition(this.proposition.id, this.currentUserId, updatedProposition).subscribe({
          next: () => {
            alert('Proposition mise à jour avec succès ! Le statut est maintenant en attente de validation.');
            this.router.navigate(['/propositions']);
          },
          error: (err) => {
            console.error('Error updating proposition:', err);
          },
        });
      }
    }
  }



/*   onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.proposition && this.currentUserId) {
      if (this.selectedFile) {
        // Use FormData when uploading a file
        const formData = new FormData();
        formData.append('title', this.proposition.title);
        formData.append('userId', this.currentUserId.toString());
        formData.append('file', this.selectedFile);

        this.propositionService.updateProposition(
          this.proposition.id,
          this.currentUserId,
          formData
        ).subscribe({
          next: () => this.router.navigate(['/propositions']),
          error: (err) => console.error('Error updating proposition:', err),
        });
      } else {
        // Use Partial<Proposition> when no file is uploaded
        const updatedProposition: Partial<Proposition> = {
          title: this.proposition.title,
        };

        this.propositionService.updateProposition(
          this.proposition.id,
          this.currentUserId,
          updatedProposition
        ).subscribe({
          next: () => this.router.navigate(['/propositions']),
          error: (err) => console.error('Error updating proposition:', err),
        });
      }
    }
  } */


  /* onSubmit(): void {
    if (this.proposition && this.currentUserId) {
      const updatedProposition: Partial<Proposition> = {
        title: this.proposition.title,
      };

      // Include file upload if a new file is selected
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('title', this.proposition.title);
        formData.append('userId', this.currentUserId.toString());
        formData.append('file', this.selectedFile);

        this.propositionService.updateProposition(
          this.proposition.id,
          this.currentUserId,
          formData
        ).subscribe({
          next: () => this.router.navigate(['/propositions']),
          error: (err) => console.error('Error updating proposition:', err),
        });
      } else {
        this.propositionService.updateProposition(
          this.proposition.id,
          this.currentUserId,
          updatedProposition
        ).subscribe({
          next: () => this.router.navigate(['/propositions']),
          error: (err) => console.error('Error updating proposition:', err),
        });
      }
    }
  } */

  cancelEdit(): void {
    this.router.navigate(['/propositions']);
  }
}
