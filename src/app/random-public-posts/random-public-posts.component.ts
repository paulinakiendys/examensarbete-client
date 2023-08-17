import { Component, OnInit } from '@angular/core';
import { RandomPublicPostsService } from './random-public-posts.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-random-public-posts',
  templateUrl: './random-public-posts.component.html',
  styleUrls: ['./random-public-posts.component.css'],
})
export class RandomPublicPostsComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'user',
    'description',
    'location',
    'mood',
    'temperature',
    'photo',
    'actions',
  ];
  currentPage = 1;
  length = 0;
  pageSize = 3;
  errorMessage: string = '';

  constructor(private randomPublicPostsService: RandomPublicPostsService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.randomPublicPostsService
      .getRandomPublicPosts(this.currentPage)
      .subscribe(
        (response) => {
          this.dataSource.data = response.data.randomOrderPosts;
          this.length = response.data.totalNumberOfItems;
          this.pageSize = response.data.itemsPerPage;
        },
        (err) => {
          this.errorMessage = err.error.message;
        }
      );
  }

  pageChanged(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.loadPosts();
  }
}
