import { Component } from '@angular/core';
import { SearchPublicPostsService } from './search-public-posts.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search-public-posts',
  templateUrl: './search-public-posts.component.html',
  styleUrls: ['./search-public-posts.component.css'],
})
export class SearchPublicPostsComponent {
  searchQuery: string = '';
  searchResults: any[] = [];
  isLoading: boolean = false;
  error: any = null;

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

  constructor(private searchPublicPostsService: SearchPublicPostsService) {}

  searchPosts() {
    if (this.searchQuery) {
      this.isLoading = true;
      this.error = null;
      this.searchResults = [];
      this.searchPublicPostsService
        .searchPublicPosts(this.currentPage, this.searchQuery)
        .subscribe(
          (response) => {
            this.searchResults = response.data.searchedPosts;
            this.length = response.data.totalNumberOfItems;
            this.dataSource = new MatTableDataSource(this.searchResults);
            this.isLoading = false;
          },
          (err) => {
            console.error('Error fetching search results:', err);
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
