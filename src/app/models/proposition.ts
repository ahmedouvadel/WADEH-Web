export interface Proposition {
    id: number;
    title: string;
    document: string; // Champ pour le document
    status: boolean;
    userId: number;
    userProfile: string; // Add this field
  }
