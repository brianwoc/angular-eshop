import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../common/Product';
import {map} from 'rxjs/operators';
import {ProductCategory} from '../common/ProductCategory';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/products';

  private categoryUrl = 'http://localhost:8080/product-category';

  constructor(private httpClient: HttpClient) {
  }

  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseProducts> {

    // need to build URL based on category id

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.category)
    );
  }

  searchProduct(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    console.log('dsds');
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(id: number): Observable<Product> {
    const searchUrl = `${this.baseUrl}/${id}`;
    console.log('Invoke getProduct');
    return this.httpClient.get<Product>(searchUrl);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  };
}

interface GetResponseProductCategory {
  _embedded: {
    category: ProductCategory[];
  };
}

