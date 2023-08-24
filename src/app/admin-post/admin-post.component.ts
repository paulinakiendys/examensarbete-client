import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AdminPostService } from './admin-post.service';

@Component({
  selector: 'app-admin-post',
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.css'],
})
export class AdminPostComponent implements OnInit {
  pendingPost: any;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private adminPostService: AdminPostService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const pendingPostId = params.get('pendingPostId');
      if (pendingPostId) {
        this.fetchPublicPost(pendingPostId);
      }
    });
  }

  fetchPublicPost(pendingPostId: string): void {
    this.adminPostService.getPendingPost(pendingPostId).subscribe(
      (response) => {
        this.pendingPost = response.data;
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }

  back(): void {
    this.location.back();
  }

  approve(): void {
    this.adminPostService.approvePendingPost(this.pendingPost._id).subscribe(
      (response) => {
        this.successMessage = response.message;
        this.pendingPost = null;
      },
      (err) => {
        this.pendingPost = null;
        this.errorMessage = err.error.message;
      }
    );
  }

  deny(): void {
    this.adminPostService.denyPendingPost(this.pendingPost._id).subscribe(
      (response) => {
        this.successMessage = response.message;
        this.pendingPost = null;
      },
      (err) => {
        this.pendingPost = null;
        this.errorMessage = err.error.message;
      }
    );
  }

  getUserPhotoStyle() {
    if (this.pendingPost && this.pendingPost.user.photo !== '') {
      return {
        'background-image': `url(${this.pendingPost.user.photo})`,
        'background-size': 'cover',
      };
    }
    return {}; // Empty style object
  }
}
