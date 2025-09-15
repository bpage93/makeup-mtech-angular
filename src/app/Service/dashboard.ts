// src/app/Service/dashboard.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Define interfaces for the data shapes
export interface StatCard {
  title: string;
  value: string;
  change?: string;
  icon: string;
  color: 'primary' | 'secondary' | 'accent' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  // Method to get the main statistics
  getStats(): Observable<StatCard[]> {
    // This is a mock API call. Replace with a real HttpClient request.
    const mockStats: StatCard[] = [
      { title: 'Revenue', value: '$31,500', change: '↗︎ 400 (22%)', icon: 'attach_money', color: 'primary' },
      { title: 'New Users', value: '1,200', change: '↗︎ 90 (14%)', icon: 'group_add', color: 'secondary' },
      { title: 'New Orders', value: '852', change: '↘︎ 35 (4%)', icon: 'shopping_cart', color: 'accent' },
      { title: 'Pending Tasks', value: '15', change: '2 remaining today', icon: 'pending_actions', color: 'info' }
    ];
    
    // Use `of()` to return an observable and `delay()` to simulate a network request
    return of(mockStats).pipe(delay(500));
  }
}