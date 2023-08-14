import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PublicPostService } from './public-post.service';

@Component({
  selector: 'app-public-post',
  templateUrl: './public-post.component.html',
  styleUrls: ['./public-post.component.css'],
})
export class PublicPostComponent implements OnInit {
  publicPost: any;

  constructor(
    private route: ActivatedRoute,
    private publicPostService: PublicPostService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const publicPostId = params.get('publicPostId');
      if (publicPostId) {
        this.fetchPublicPost(publicPostId);
      }
    });
  }

  fetchPublicPost(publicPostId: string): void {
    this.publicPostService.getPublicPost(publicPostId).subscribe(
      (response) => {
        this.publicPost = response.data;
      },
      (error) => {
        console.error('Error fetching public post:', error);
      }
    );
  }

  back(): void {
    this.location.back();
  }

  getUserPhotoStyle() {
    if (this.publicPost && this.publicPost.user.photo !== '') {
      return {
        'background-image': `url(${this.publicPost.user.photo})`,
        'background-size': 'cover',
      };
    }
    return {}; // Empty style object
  }
}
