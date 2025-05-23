export interface Comment {
    id?: number;        // ID est optionnel pour les nouveaux commentaires
    text: string;       // Texte du commentaire
    userId: number| any;     // ID de l'utilisateur qui a écrit le commentaire
    contentId: number | any;
    userProfile?: string; // Optional field for user profile

  }
