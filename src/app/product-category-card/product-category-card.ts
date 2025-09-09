import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryDisplayData } from '../Service/makeupService'; // Import the data model
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-category-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-category-card.html',
  styleUrl: './product-category-card.css'
})
export class ProductCategoryCardComponent {
  // 1. Use the @Input decorator to allow data to be passed in from the parent.
  // We strongly type it to ensure it always receives the correct data shape.
  @Input() category!: CategoryDisplayData; 
}
