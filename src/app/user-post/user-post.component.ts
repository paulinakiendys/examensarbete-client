import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserPostService } from './user-post.service';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css'],
})
export class UserPostComponent implements OnInit {
  userPost: any;

  constructor(
    private route: ActivatedRoute,
    private userPostService: UserPostService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userPostId = params.get('userPostId');
      if (userPostId) {
        this.fetchUserPost(userPostId);
      }
    });
  }

  fetchUserPost(userPostId: string): void {
    this.userPostService.getUserPost(userPostId).subscribe(
      (response) => {
        this.userPost = response.data;
      },
      (error) => {
        console.error('Error fetching user post:', error);
      }
    );
  }

  back(): void {
    this.location.back();
  }

  getUserPhotoStyle() {
    if (this.userPost && this.userPost.user.photo !== '') {
      return {
        'background-image': `url(${this.userPost.user.photo})`,
        'background-size': 'cover',
      };
    }
    return {}; // Empty style object
  }
}
