import { Component, inject, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MakeupService } from '../Service/makeupService';
import { MakeupProduct } from '../interface/makeup-product';
import { CartService } from '../Service/cart-service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnChanges {
  @Input() categoryName!: string;

  private makeupService = inject(MakeupService);
  private cartService = inject(CartService); 

  public products$!: Observable<MakeupProduct[]>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryName']) {
      this.products$ = this.makeupService.getProductsForCategory(this.categoryName);
    }
  }

  addToCart(product: MakeupProduct): void {
    this.cartService.addItem(product);
    alert(`${product.name} has been added to your cart.`);
  }
}
