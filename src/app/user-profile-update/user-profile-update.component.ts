import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  AuthActions,
  selectError,
  selectLoading,
  selectMessage,
  selectUser,
} from '../store/auth';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.css'],
})
export class UserProfileUpdateComponent {
  private store = inject(Store);
  readonly error$ = this.store.select(selectError);
  readonly loading$ = this.store.select(selectLoading);
  readonly message$ = this.store.select(selectMessage);
  readonly user$ = this.store.select(selectUser);

  email: string = '';
  password: string = '';
  photo: string | ArrayBuffer | null | undefined = '';
  selectedFile: File | null = null;

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user) {
        this.email = user.email;
        this.photo = user.photo;
      }
    });
  }

  submit(updateProfileForm: NgForm) {
    if (updateProfileForm.valid) {
      const formData = new FormData();

      if (this.selectedFile) {
        formData.append('photo', this.selectedFile);
      }

      formData.append('email', this.email);
      formData.append('password', this.password);

      this.store.dispatch(AuthActions.updateProfile({ formData }));
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photo = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
