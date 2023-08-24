import { Component, OnInit } from '@angular/core';
import { AdminPostsService } from './admin-posts.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.css']
})
export class AdminPostsComponent implements OnInit {
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

  constructor(private adminPostsService: AdminPostsService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.adminPostsService
      .getPendingPosts(this.currentPage)
      .subscribe(
        (response) => {
          this.dataSource.data = response.data.pendingPosts;
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
