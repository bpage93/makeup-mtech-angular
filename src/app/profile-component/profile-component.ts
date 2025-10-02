import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../Service/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-profile-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.css',
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  public user = toSignal(this.authService.user$);
  isLoading = true;
  selectedFile: File | null = null;

  profileForm = new FormGroup({
    displayName: new FormControl('', [Validators.required]),
    email: new FormControl({ value: '', disabled: true }),
  });

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.profileForm.patchValue({
          displayName: user.displayName || '',
          email: user.email || '',
        });
        this.isLoading = false;
      }
    });
  }

  async updateProfile() {
    if (this.profileForm.valid) {
      const displayName = this.profileForm.get('displayName')?.value;
      if (displayName) {
        await this.authService.updateProfile(displayName);
        alert('Profile updated successfully!');
      }
    }
    if (this.selectedFile && this.user()) {
      const photoURL = await this.authService.uploadProfileImage(
        this.selectedFile,
        this.user() as User
      );
      await this.authService.updatePhotoURL(photoURL);
      alert('Profile image updated successfully!');
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async sendVerificationEmail() {
    await this.authService.sendEmailVerification();
    alert('Verification email sent!');
  }
}
