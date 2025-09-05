import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Correctly import from the service file, including the new interface
import { MakeupService, CategoryDisplayData } from '../Service/makeupService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop-component.html',
  styleUrl: './shop-component.css'
})
export class ShopComponent {
  private makeupService = inject(MakeupService);

  // Strongly type the observable for better type safety and autocompletion
  public productTypes$: Observable<CategoryDisplayData[]>;

  constructor() {
    // Connect directly to the service's clean data stream
    this.productTypes$ = this.makeupService.categoryDisplayData$;
  }
}