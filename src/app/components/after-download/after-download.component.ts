import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-after-download',
  templateUrl: './after-download.component.html',
  styleUrls: ['./after-download.component.css'],
})
export class AfterDownloadComponent implements OnInit {
  fileName: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate(['/propositions']); // Redirect to the homepage or any other route
  }
}
