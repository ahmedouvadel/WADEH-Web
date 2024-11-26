import { Component, Input } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';
import { window } from 'rxjs';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent {
  @Input() contentId!: number | undefined; // Content ID to associate the comment with
  text: string = '';
  comments: Comment[]| undefined;

  constructor(private commentService: CommentService) {}

  createComment(): void {
    if (this.text.trim()) {
      const newComment: Comment = {
        text: this.text,
        contentId: this.contentId,
        userId: +localStorage.getItem('userId')! // Example user ID retrieval
      };

      this.commentService.createComment(newComment).subscribe((comment) => {
        alert('Commentaire ajouté avec succès');
        this.text = ''; // Clear input field
        this.loadComments();
      });
    }

  }

  loadComments(): void {
    this.commentService.getCommentsByContentId(this.contentId).subscribe((comments) => {
      this.comments = comments;
    });
  }


}
