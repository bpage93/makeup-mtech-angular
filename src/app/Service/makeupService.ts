import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MakeupProduct } from '../interface/makeup-product';

// The shape of the categorized data object
export interface CategorizedProducts {
  [category: string]: MakeupProduct[];
}

// The clean data structure for the component
export interface CategoryDisplayData {
  name: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class MakeupService {
  private http = inject(HttpClient);
  private apiUrl = 'https://makeup-api.herokuapp.com/api/v1/products.json';

  private productsByCategory = new BehaviorSubject<CategorizedProducts>({});
  public productsByCategory$ = this.productsByCategory.asObservable();
  
  public categoryDisplayData$: Observable<CategoryDisplayData[]>;

  constructor() {
    this.fetchAllProductsAndGroupThem();

    this.categoryDisplayData$ = this.productsByCategory$.pipe(
      map((categorizedProducts) => {
        const categories = Object.keys(categorizedProducts);
        return categories
          .map((category) => {
            const firstProduct = categorizedProducts[category]?.[0];
            if (firstProduct) {
              return {
                name: category,
                imageUrl: firstProduct.image_link,
              };
            }
            return null;
          })
          .filter(
            (item): item is CategoryDisplayData => item !== null && item.name !== 'uncategorized'
          );
      })
    );
  }

  /**
   * Gets the products for a single category from the already grouped data.
   * This is the method that was missing.
   * @param categoryName The name of the category to retrieve.
   * @returns An Observable that emits an array of MakeupProducts for the given category.
   */
  public getProductsForCategory(categoryName: string): Observable<MakeupProduct[]> {
    return this.productsByCategory$.pipe(
      map(categorizedProducts => categorizedProducts[categoryName] || [])
    );
  }

  private fetchAllProductsAndGroupThem(): void {
    this.http
      .get<MakeupProduct[]>(this.apiUrl)
      .pipe(
        tap((products) => {
          const groupedProducts = this.groupProductsByCategory(products);
          this.productsByCategory.next(groupedProducts);
        })
      )
      .subscribe({
        error: (err) => console.error('Failed to fetch and group products', err),
      });
  }

  private groupProductsByCategory(products: MakeupProduct[]): CategorizedProducts {
    return products.reduce((accumulator, product) => {
      const category = product.category || 'uncategorized';
      if (!accumulator[category]) {
        accumulator[category] = [];
      }
      accumulator[category].push(product);
      return accumulator;
    }, {} as CategorizedProducts);
  }
}