import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserPostEditService } from './user-post-edit.service';

@Component({
  selector: 'app-user-post-edit',
  templateUrl: './user-post-edit.component.html',
  styleUrls: ['./user-post-edit.component.css'],
})
export class UserPostEditComponent implements OnInit {
  userPost: any = {
    description: '',
    location: '',
    mood: null,
    temperature: null,
    isPublic: false,
  };
  selectedFile: File | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private userPostEditService: UserPostEditService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userPostId = params.get('userPostId');
      if (userPostId) {
        this.getUserPost(userPostId);
      }
    });
  }

  getUserPost(userPostId: string): void {
    this.userPostEditService.getUserPost(userPostId).subscribe(
      (response) => {
        this.userPost = response.data;
      },
      (error) => {
        console.error('Error fetching user post:', error);
      }
    );
  }

  submit() {
    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    formData.append('description', this.userPost.description);
    formData.append('location', this.userPost.location);
    formData.append('mood', this.userPost.mood);
    formData.append('temperature', this.userPost.temperature);
    formData.append('isPublic', this.userPost.isPublic);

    this.userPostEditService
      .editUserPost(this.userPost._id, formData)
      .subscribe(
        (response) => {
          this.errorMessage = '';
          this.successMessage = response.data.message;
        },
        (err) => {
          this.successMessage = '';
          this.errorMessage = err.error.message;
        }
      );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
