import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';
import { window } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { Content } from 'src/app/models/content';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  @Input() contentId!: number | undefined; // Content ID to associate the comment with
  text: string = '';
  comments: Comment[]| undefined;
  contents: Content[] = [];
  newComment: string = '';
  filteredContents: Content[] = [];
  selectedCategory: string = '';

  constructor(private commentService: CommentService,
    private contentService:ContentService
  ) {}
  ngOnInit(): void {
    this.fetchContents();
  }

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
    location.reload();  }

  fetchContents(): void {
    this.contentService.getAllContents().subscribe((contents) => {
      this.contents = contents;

      // Filter contents by selected category
      this.filteredContents = this.selectedCategory
        ? this.contents.filter(
            (content) =>
              content.category.toLowerCase() === this.selectedCategory.toLowerCase()
          )
        : this.contents;
    });
  }

  loadComments(): void {
    this.commentService.getCommentsByContentId(this.contentId).subscribe((comments) => {
      this.comments = comments;
    });
  }

}
