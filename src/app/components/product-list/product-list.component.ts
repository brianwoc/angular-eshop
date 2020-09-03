import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/Product';
import {ActivatedRoute} from '@angular/router';
import {CartItem} from '../../common/CartItem';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  searchMode = false;
  products: Product[] = [];
  currentCategoryId = 1;
  thePage = 1;

  previousCathegoryId = 1;

  thePageSize = 5;
  theTotalElements = 0;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    this.listProducts();
  }

  // tslint:disable-next-line:typedef
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProduct();
    } else {
      this.productListHandle();
    }
  }

  productListHandle(): void {
    const hascathegoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hascathegoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }

    if (this.previousCathegoryId !== this.currentCategoryId) {
      this.thePage = 1;
    }

    this.previousCathegoryId = this.currentCategoryId;
    console.log(`currentCategory=${this.currentCategoryId}, thePageNumber=${this.thePage}`);

    this.productService.getProductListPaginate(this.thePage - 1, this.thePageSize, this.currentCategoryId).subscribe(this.processResult());

  }


  private handleSearchProduct():
    void {
    const keyword
      :
      string = this.route.snapshot.paramMap.get('keyword');
    this.productService.searchProduct(keyword).subscribe(data => {
        this.products = data;
      }
    );
  }

  private processResult() {
    return data => {
      this.products = data._embedded.products;
      this.thePage = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: number): void{
    this.thePageSize = pageSize;
    this.thePage = 1;
    this.listProducts();
  }

  addToCart(temp: Product) {
    console.log(temp.name);
    console.log(temp.unitPrice);
    const  theCartItem = new CartItem(temp);
    this.cartService.addToCart(theCartItem);



  }
}
