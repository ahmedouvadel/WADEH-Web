import { Component } from '@angular/core';
import { Content } from '../../models/content'; // Assurez-vous que le modèle Content existe et est bien importé
import { ContentService } from '../../services/content.service';
import { Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from '../../models/comment';  // Ajustez le chemin si nécessaire
import { UserService } from 'src/app/services/user.service';
import { UserStorageService } from 'src/app/services/Storage/user-storage.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent {

  contents: Content[] = [];
  selectedContent: Content | null = null;
  comments: Comment[] = [];
  newComment: string = '';
  filteredContents: Content[] = [];
  selectedCategory: string = '';
  isAgentLoggedIn : boolean = UserStorageService.isUserLoggedIn();
  isAdminLoggedIn : boolean = UserStorageService.isAdminLoggedIn();

  constructor(
    private contentService: ContentService,
    private commentService: CommentService,  // Ajout du CommentService
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isAgentLoggedIn = UserStorageService.isUserLoggedIn();
    this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    this.contentService.getAllContents().subscribe(contents => {
      console.log(contents)
      this.contents = contents;
    });
    // Watch for changes in the category parameter
    this.route.params.subscribe((params) => {
      this.selectedCategory = params['category'];
      this.fetchContents();
    });
  }

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

  viewContent(content: Content) {
    this.selectedContent = content;
  }

  closeModal(): void {
    this.selectedContent = null; // Désélectionne le contenu
    this.comments = []; // Réinitialise les commentaires
    this.newComment = '';
  }
    viewComments(contentId: number | undefined): void {
      if (contentId) {
        this.commentService.getCommentsByContentId(contentId).subscribe(
          (comments) => {
            this.comments = comments;
            console.log('Commentaires récupérés :', this.comments);
          },
          (error) => {
            console.error('Erreur lors de la récupération des commentaires :', error);
          }
        );
      } else {
        console.error('Content ID is undefined');
      }
    }


  submitComment(contentId: any): void {
    if (contentId !== undefined) {
      const userId = this.userService.getCurrentUserId();

      if (userId !== null && this.newComment.trim()) {
        const comment: Comment = {
          contentId,
          userId,
          text: this.newComment,
        };

        this.commentService.createComment(comment).subscribe((newComment: Comment) => {
          this.comments.push(newComment);
          this.newComment = ''; // Réinitialiser le champ de texte
        });
      } else {
        console.error('Utilisateur non connecté ou commentaire vide');
      }
    } else {
      console.error('ID du contenu non défini');
    }
  }

  deleteContent(contentId: number | undefined): void {
    if (!contentId) {
      console.error('Invalid content ID');
      return;
    }

    const confirmation = confirm('Are you sure you want to delete this content?');
    if (confirmation) {
      this.contentService.deleteContent(contentId).subscribe({
        next: () => {
          this.contents = this.contents.filter((content) => content.id !== contentId);
          console.log(`Content with ID ${contentId} has been deleted.`);
        },
        error: (err) => {
          console.error('Error deleting content:', err);
        },
      });
    }
  }

  updateContent(content: Content): void {
    // Redirect to an edit form with the content ID
    this.router.navigate(['/contents/edit', content.id]);
  }

    canEditComment(commentUserId: number): boolean {
      return commentUserId === this.userService.getCurrentUserId();
    }

    delteeComment(commentUserId: number): boolean {
      return this.isAdminLoggedIn || commentUserId === this.userService.getCurrentUserId();
    }


    editComment(commentId: number | undefined ): void {
      const commentToEdit = this.comments.find((comment) => comment.id === commentId);
      if (commentToEdit) {
        const newText = prompt('Edit your comment:', commentToEdit.text);
        if (newText !== null && newText.trim() !== '') {
          const updatedComment = { ...commentToEdit, text: newText };

          this.commentService.updateComment(commentId, updatedComment).subscribe({
            next: (updated) => {
              const index = this.comments.findIndex((comment) => comment.id === updated.id);
              if (index !== -1) this.comments[index] = updated;
              console.log('Comment updated:', updated);
            },
            error: (err) => console.error('Error updating comment:', err),
          });
        }
      }
    }

    deleteComment(commentId: number| undefined): void {
      const confirmation = confirm('Are you sure you want to delete this comment?');
      if (confirmation) {
        const userId = this.userService.getCurrentUserId();
        if (userId !== null) {
          this.commentService.deleteComment(commentId).subscribe({
            next: () => {
              this.comments = this.comments.filter((comment) => comment.id !== commentId);
              console.log(`Comment with ID ${commentId} has been deleted.`);
            },
            error: (err) => console.error('Error deleting comment:', err),
          });
        }
      }
    }


}
