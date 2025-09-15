// src/app/dashboard-component/dashboard-component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { DashboardService, StatCard } from '../Service/dashboard'; // Import the service and interface

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
  // Inject the service
  private dashboardService = inject(DashboardService);
  
  // Create an observable to hold the stats data
  public stats$: Observable<StatCard[]> = this.dashboardService.getStats();
}