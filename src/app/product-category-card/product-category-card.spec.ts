import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryCard } from './product-category-card';

describe('ProductCategoryCard', () => {
  let component: ProductCategoryCard;
  let fixture: ComponentFixture<ProductCategoryCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCategoryCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCategoryCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
