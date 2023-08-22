import { Component } from '@angular/core';
import { UserPostsInRangeService } from './user-posts-in-range.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-posts-in-range',
  templateUrl: './user-posts-in-range.component.html',
  styleUrls: ['./user-posts-in-range.component.css'],
})
export class UserPostsInRangeComponent {
  startYear!: number;
  endYear!: number;
  posts: any[] = [];
  isLoading: boolean = false;
  error: any = null;

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'description',
    'location',
    'mood',
    'temperature',
    'photo',
    'date',
    'actions',
  ];

  currentPage = 1;
  length = 0;
  pageSize = 3;

  constructor(private userPostsService: UserPostsInRangeService) {}

  getUserPostsInRange(): void {
    this.isLoading = true;
    this.error = null;
    this.posts = [];
    this.userPostsService
      .getUserPostsInRange(this.startYear, this.endYear, this.currentPage)
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.posts = response.data.posts;
          this.length = response.data.totalNumberOfItems;
          this.dataSource = new MatTableDataSource(this.posts);
          this.currentPage = response.data.currentPage;
        },
        (err) => {
          this.isLoading = false;
          this.error = err.error.message;
        }
      );
  }

  pageChanged(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.getUserPostsInRange();
  }
}
