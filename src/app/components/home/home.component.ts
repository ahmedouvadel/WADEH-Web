import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private contentService:ContentService
  ){}
  ngOnInit(): void {
    this.contentService.getAllContents().subscribe(data => {
      console.log(data);
  })
}

}
