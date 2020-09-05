import {Component, OnInit} from '@angular/core';
import {Product} from '../../common/Product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../common/CartItem';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product();

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>
      this.handleProductDetails());
  }

  private handleProductDetails(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id).subscribe((data) => {
      this.product = data;
    });
  }

  addToCart() {
    console.log("Adding to cart");
    console.log(this.product.name);
    console.log(this.product.unitPrice);

    const  theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }
}
