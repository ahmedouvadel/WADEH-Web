import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-category-contents',
  templateUrl: './category-contents.component.html',
  styleUrls: ['./category-contents.component.css']
})
export class CategoryContentsComponent implements OnInit {
  category: string = ''; // Holds the selected category
  contents: any[] = []; // Holds the filtered contents

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    // Fetch the category from the route and load contents
    this.route.params.subscribe((params) => {
      this.category = params['category']; // Get category from route params
      this.loadContents(); // Load contents for the category
    });
  }

  loadContents(): void {
    this.contentService.getAllContents().subscribe((contents) => {
      // Filter contents based on the selected category
      this.contents = contents.filter(
        (content: any) => content.category.toLowerCase() === this.category.toLowerCase()
      );
    });
  }
}
