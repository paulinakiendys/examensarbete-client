import { Component } from '@angular/core';
import { AddPostService } from './add-post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent {
  post: any = {
    description: '',
    location: '',
    mood: null,
    temperature: null,
    isPublic: false,
  };
  selectedFile: File | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private addPostService: AddPostService) {}

  submit() {
    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    formData.append('description', this.post.description);
    formData.append('location', this.post.location);
    formData.append('mood', this.post.mood.toString());
    formData.append('temperature', this.post.temperature.toString());
    formData.append('isPublic', this.post.isPublic.toString());

    this.addPostService.addPost(formData).subscribe(
      (response) => {
        this.errorMessage = '';
        this.successMessage = response.message;
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
