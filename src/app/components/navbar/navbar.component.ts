import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ContentService } from 'src/app/services/content.service';
import { UserStorageService } from 'src/app/services/Storage/user-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  categories: string[] = [];
  isAuthenticated: boolean = false;
  authSubscription: any;
  isAgentLoggedIn : boolean = UserStorageService.isUserLoggedIn();
  isAdminLoggedIn : boolean = UserStorageService.isAdminLoggedIn();

  constructor(
    private router: Router,
    private authService: AuthService,
    private userStorageService: UserStorageService,
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    this.isAgentLoggedIn = UserStorageService.isUserLoggedIn();
    this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    this.authSubscription = this.authService.authState$.subscribe((authState) => {
    this.isAuthenticated = authState;
    });

    this.loadCategories();
  }

  filterCategories() {
    this.contentService.getAllContents().subscribe((contents) => {
      const uniqueCategories = new Set(contents.map((content: any) => content.category));
      this.categories = Array.from(uniqueCategories);
    });
  }

  loadCategories() {
    this.contentService.getAllContents().subscribe((contents) => {
      const uniqueCategories = new Set(contents.map((content: any) => content.category));
      this.categories = Array.from(uniqueCategories); // Convertir en tableau
    });
  }

  // Naviguer vers le composant CategoryContents avec la catégorie sélectionnée
  selectCategory(category: string) {
    this.router.navigate(['/contents', category.toLowerCase()]);
  }


  logout() {
    this.userStorageService.signOut();
    this.isAuthenticated = false;
    this.isAgentLoggedIn = UserStorageService.isUserLoggedIn();
    this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    this.router.navigate(['/login']);
  }
}
