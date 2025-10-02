import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService, AdminUserSearchResult } from '../Service/admin-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard {
  private fb = inject(FormBuilder);
  private adminService = inject(AdminService);

  // Signals for state management
  foundUser = signal<AdminUserSearchResult | null>(null);
  isLoading = signal(false);
  searchMessage = signal('');
  grantMessage = signal('');

  searchForm = this.fb.group({
    username: ['', [Validators.required]], // Changed from 'email'
  });

  constructor() {
    this.fb = inject(FormBuilder);
    this.adminService = inject(AdminService);
  }

  async onSearch(): Promise<void> {
    if (this.searchForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.foundUser.set(null);
    this.searchMessage.set('');
    this.grantMessage.set('');

    const username = this.searchForm.value.username!; // Changed from 'email'

    try {
      const user = await this.adminService.findUser(username); // Pass username
      if (user) {
        this.foundUser.set(user);
      } else {
        this.searchMessage.set('No user found with that username.');
      }
    } catch (error) {
      console.error('Search error:', error);
      this.searchMessage.set('An error occurred during the search.');
    } finally {
      this.isLoading.set(false);
    }
  }

  async onMakeAdmin(): Promise<void> {
    const user = this.foundUser();
    if (!user) {
      return;
    }

    this.isLoading.set(true);
    this.grantMessage.set('');

    try {
      const result: any = await this.adminService.grantAdminRole(user.uid); // Pass UID
      this.grantMessage.set(result.data.message || 'Role granted successfully!');
      this.foundUser.update((u) => (u ? { ...u, isAdmin: true } : null));
    } catch (error: any) {
      console.error('Grant role error:', error);
      this.grantMessage.set(error.message || 'Failed to grant admin role.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
