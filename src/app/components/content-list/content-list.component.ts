import { Component } from '@angular/core';
import { Content } from '../../models/content'; // Assurez-vous que le modèle Content existe et est bien importé
import { ContentService } from '../../services/content.service';
import { Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from '../../models/comment';  // Ajustez le chemin si nécessaire
import { UserService } from 'src/app/services/user.service';
import { UserStorageService } from 'src/app/services/Storage/user-storage.service';


@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent {

  contents: Content[] = [];
  selectedContent: Content | null = null;
  comments: Comment[] = [];
  filteredContents = []; // Pour stocker les contenus filtrés
  selectedCategory: string | null = null; // La catégorie sélectionnée
  newComment: string = '';
  isAgentLoggedIn : boolean = UserStorageService.isUserLoggedIn();
  isAdminLoggedIn : boolean = UserStorageService.isAdminLoggedIn();

  constructor(
    private contentService: ContentService,
    private commentService: CommentService,  // Ajout du CommentService
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.isAgentLoggedIn = UserStorageService.isUserLoggedIn();
    this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    this.contentService.getAllContents().subscribe(contents => {
      console.log(contents)
      this.contents = contents;
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


  viewComments(contentId: any | undefined): void {
    if (contentId) {
      // Appelez la méthode seulement si contentId est défini.
      this.commentService.getCommentsByContentId(contentId).subscribe(
        (comments) => {
          // Logique pour afficher les commentaires
          this.comments = comments; // Stocke les commentaires récupérés
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

    updateContent(_t11: Content) {
    throw new Error('Method not implemented.');
    }

}
