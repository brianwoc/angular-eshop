import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ProductCategory} from '../../common/ProductCategory';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    console.log('2');

    this.listProductCategories();
  }

  listProductCategories(): void {
    console.log('1');

    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }
}
