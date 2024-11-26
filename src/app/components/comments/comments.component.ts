import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';
import { UserService } from '../../services/user.service';
import { UserStorageService } from 'src/app/services/Storage/user-storage.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() contentId!: number| undefined; // Content ID to load comments for
  comments: Comment[] = [];
  isUserLoggedIn : boolean = UserStorageService.isUserLoggedIn();
  isAdminLoggedIn : boolean = UserStorageService.isAdminLoggedIn();

  constructor(
    private commentService: CommentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn = UserStorageService.isUserLoggedIn();
    this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    this.loadComments();
  }

  loadComments(): void {
    this.commentService.getCommentsByContentId(this.contentId).subscribe((comments) => {
      this.comments = comments;
    });
  }

  canEditComment(userId: number): boolean {
    return userId === this.userService.getCurrentUserId();
  }

  canDeleteComment(userId: number): boolean {
    return this.isAdminLoggedIn || userId === this.userService.getCurrentUserId();
  }

  editComment(comment: Comment): void {
    const updatedText = prompt('Modifier le commentaire:', comment.text);
    if (updatedText && updatedText.trim()) {
      const updatedComment = { ...comment, text: updatedText };
      this.commentService.updateComment(comment.id!, updatedComment).subscribe((newComment) => {
        const index = this.comments.findIndex((c) => c.id === comment.id);
        if (index !== -1) this.comments[index] = newComment;
      });
    }
  }

  deleteComment(commentId: number | undefined): void {
    if (confirm('Voulez-vous vraiment supprimer ce commentaire ?')) {
      this.commentService.deleteComment(commentId).subscribe(() => {
        this.comments = this.comments.filter((c) => c.id !== commentId);
      });
    }
  }
}
