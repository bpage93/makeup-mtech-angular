import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakeupService, CategoryDisplayData } from '../Service/makeupService';
import { ProductCategoryCardComponent } from '../product-category-card/product-category-card';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';



import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ProductCategoryCardComponent
  ],
  templateUrl: './shop-component.html',
  styleUrl: './shop-component.css'
})
export class ShopComponent {
  private makeupService = inject(MakeupService);

  // 1. Create a signal to hold the user's search term
  public searchTerm = signal('');

  // 2. Convert the observable from the service into a signal
  private productTypes = toSignal(this.makeupService.categoryDisplayData$, { initialValue: [] });

  // 3. Create a computed signal that automatically filters the list
  public filteredProductTypes = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const types = this.productTypes();
    
    if (!term) {
      return types; // If search is empty, return all types
    }

    // Otherwise, filter the types based on the search term
    return types.filter(type => 
      type.name.toLowerCase().includes(term)
    );
  });
}
