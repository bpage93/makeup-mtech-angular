import { Component } from '@angular/core';
import { TitleCasePipe, CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-card',
    imports: [TitleCasePipe, CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
products = () => [
    {
      id: 1,
      name: 'Lipstick',
      brand: 'Brand A',
      image_link: 'https://cdn.shopify.com/s/files/1/1338/0845/products/brain-freeze_a_800x1200.jpg?v=1502255076',
      product_type: 'lipstick',
      price_sign: '$',
      price: '15.99',
    },
    {
      id: 2,
      name: 'Foundation',
      brand: 'Brand B',
      image_link: 'https://via.placeholder.com/300x300',
      product_type: 'foundation',
      price_sign: '$',
      price: '24.99',
    },
  ];
}
