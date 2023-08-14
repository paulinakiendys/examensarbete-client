import { Component, OnInit } from '@angular/core';
import { NewestPublicPostsService } from './newest-public-posts.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-newest-public-posts',
  templateUrl: './newest-public-posts.component.html',
  styleUrls: ['./newest-public-posts.component.css'],
})
export class NewestPublicPostsComponent implements OnInit {
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

  constructor(private newestPublicPostsService: NewestPublicPostsService) {}

  ngOnInit(): void {
    this.loadNewestPosts();
  }

  loadNewestPosts(): void {
    this.newestPublicPostsService
      .getNewestPublicPosts(this.currentPage)
      .subscribe((response) => {
        const newestPosts = response.data.newestPosts.map((post: { createdAt: string; }) => ({
          ...post,
          createdAt: new Date(post.createdAt)
        }));

        this.dataSource.data = newestPosts;
        this.length = response.data.totalNumberOfItems;
        this.pageSize = response.data.itemsPerPage;
      });
  }

  pageChanged(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.loadNewestPosts();
  }
}
