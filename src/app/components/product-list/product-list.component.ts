import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/Product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;
  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
    this.listProducts();
  }
  // tslint:disable-next-line:typedef
  listProducts(){
    const  hascathegoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hascathegoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else {
      this.currentCategoryId = 1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;

      }
    );
  }

}
