import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent {
  contentId: number; // ID of the content to which the comment is related
  userId: string | null; // User ID fetched from localStorage
  text: string = ''; // Text of the comment
  isSubmitting: boolean = false; // Indicates if the form is being submitted

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commentService: CommentService
  ) {
    // Retrieve contentId from the route parameters
    this.contentId = +this.route.snapshot.paramMap.get('contentId')!;
    // Retrieve userId from localStorage
    this.userId = localStorage.getItem('userId');
  }

  // Method to create a comment
  createComment(): void {
    if (this.text.trim() === '') {
      alert('Le commentaire ne peut pas être vide.');
      return;
    }

    if (!this.userId) {
      alert('Utilisateur non identifié.');
      return;
    }

    this.isSubmitting = true;

    const comment: Comment = {
      text: this.text,
      userId: +this.userId, // Convert userId to number if needed
      contentId: this.contentId
    };

    this.commentService.createComment(comment).subscribe(
      () => {
        this.isSubmitting = false;
        alert('Commentaire ajouté avec succès.');
        this.router.navigate([`/contents/${this.contentId}`]); // Redirect to the content's page
      },
      (error) => {
        console.error('Erreur lors de la création du commentaire:', error);
        this.isSubmitting = false;
      }
    );
  }
}
