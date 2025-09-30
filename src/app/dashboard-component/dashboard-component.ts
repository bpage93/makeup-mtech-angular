import { Component, AfterViewInit, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Service/auth.service';

// --- ANGULAR MATERIAL IMPORTS ---
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// --- CHART.JS IMPORTS ---
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,

  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: `./dashboard-component.html`,
})
export class DashboardComponent implements AfterViewInit {
  // Get a reference to the canvas element in the template
  @ViewChild('salesChart') private chartRef!: ElementRef;
  private chart!: Chart;

  authService = inject(AuthService);
  user = this.authService.currentUser;

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    const data = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Sales',
          data: [1200, 1500, 1100, 1800, 1600, 1900, 2100],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          pointBackgroundColor: 'rgb(75, 192, 192)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(75, 192, 192)',
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false, // You can turn the legend on/off here
        },
      },
    };

    // Create the chart
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: data,
      options: options,
    });
  }
}
