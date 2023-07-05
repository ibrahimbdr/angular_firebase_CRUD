import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { IProduct } from './../../models/iproduct';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  p: number = 1;
  Product: IProduct[];
  hideWhenNoProduct: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;

  constructor(public productApi: ProductService) {}

  ngOnInit() {
    this.dataState();
    this.productApi.GetProductsList().subscribe(data => {
      this.Product = data;
    });
  }

  dataState() {
    this.productApi.GetProductsList().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.hideWhenNoProduct = false;
        this.noData = true;
      } else {
        this.hideWhenNoProduct = true;
        this.noData = false;
      }
    });
  }

  deleteProduct(product) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      this.productApi.DeleteProduct(product.id);
      alert(product.title + ' successfully deleted!');
    }
  }
}
