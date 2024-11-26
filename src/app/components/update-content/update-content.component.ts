import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { Content } from '../../models/content';

@Component({
  selector: 'app-update-content',
  templateUrl: './update-content.component.html',
  styleUrls: ['./update-content.component.css'],
})
export class UpdateContentComponent implements OnInit {
  content: Content | null = null; // Holds content to edit
  contentId: number | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contentId = Number(this.route.snapshot.paramMap.get('id')); // Get content ID from URL

    if (this.contentId) {
      this.loadContent(this.contentId);
    }
  }

  loadContent(id: number): void {
    this.isLoading = true;
    this.contentService.getContentById(id).subscribe({
      next: (data) => {
        this.content = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load content.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  updateContent(): void {
    if (this.content && this.contentId) {
      this.contentService.updateContent(this.contentId, this.content).subscribe({
        next: () => {
          console.log('Content updated successfully.');
          this.router.navigate(['/contents/:category']); // Navigate back to content list
        },
        error: (err) => {
          this.errorMessage = 'Failed to update content.';
          console.error(err);
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/contents/:category']);
  }
}
