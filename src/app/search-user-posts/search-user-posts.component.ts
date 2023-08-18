import { Component, OnInit } from '@angular/core';
import { SearchUserPostsService } from './search-user-posts.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search-user-posts',
  templateUrl: './search-user-posts.component.html',
  styleUrls: ['./search-user-posts.component.css'],
})
export class SearchUserPostsComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];
  isLoading: boolean = false;
  error: any = null;

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
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

  constructor(private searchUserPostsService: SearchUserPostsService) {}

  ngOnInit() {
    this.searchPosts();
  }

  searchPosts() {
    if (this.searchQuery) {
      this.isLoading = true;
      this.error = null;
      this.searchResults = [];
      this.searchUserPostsService
        .searchUserPosts(this.currentPage, this.searchQuery)
        .subscribe(
          (response) => {
            this.searchResults = response.data.searchedPosts;
            this.length = response.data.totalNumberOfItems;
            this.dataSource = new MatTableDataSource(this.searchResults);
            this.isLoading = false;
          },
          (err) => {
            this.error = err.error.message;
            this.isLoading = false;
          }
        );
    }
  }

  pageChanged(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.searchPosts();
  }
}

