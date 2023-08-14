import { Component, OnInit } from '@angular/core';
import { OldestPublicPostsService } from './oldest-public-posts.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-oldest-public-posts',
  templateUrl: './oldest-public-posts.component.html',
  styleUrls: ['./oldest-public-posts.component.css'],
})
export class OldestPublicPostsComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'user',
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

  constructor(private oldestPublicPostsService: OldestPublicPostsService) {}

  ngOnInit(): void {
    this.loadOldestPosts();
  }

  loadOldestPosts(): void {
    this.oldestPublicPostsService
      .getOldestPublicPosts(this.currentPage)
      .subscribe((response) => {
        const oldestPosts = response.data.oldestPosts.map((post: { createdAt: string; }) => ({
          ...post,
          createdAt: new Date(post.createdAt)
        }));

        this.dataSource.data = oldestPosts;
        this.length = response.data.totalNumberOfItems;
        this.pageSize = response.data.itemsPerPage;
      });
  }

  pageChanged(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.loadOldestPosts();
  }
}
