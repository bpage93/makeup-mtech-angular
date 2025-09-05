import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- ANGULAR MATERIAL IMPORTS ---
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: `./dashboard-component.html`,
})
export class DashboardComponent {
  // Component logic would go here
}