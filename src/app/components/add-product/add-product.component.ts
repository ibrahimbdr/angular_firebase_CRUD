import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public productForm: FormGroup;
  constructor(
    public productApi: ProductService,
    public fb: FormBuilder,
  ) {}
  ngOnInit() {
    this.productApi.GetProductsList();
    this.prodForm();
  }
  prodForm() {
    this.productForm = this.fb.group({
      brand: ['', [Validators.required]],
      price: ['',[Validators.required]],
      title: ['',[Validators.required]],
      images: ['', [Validators.required]],
      sellerId: ['', [Validators.required]]
    });
  }
  get brand() {
    return this.productForm.get('brand');
  }
  get price() {
    return this.productForm.get('price');
  }
  get title() {
    return this.productForm.get('title');
  }
  get images() {
    return this.productForm.get('images');
  }
  get sellerId() {
    return this.productForm.get('sellerId');
  }
  ResetForm() {
    this.productForm.reset();
  }
  submitProductData() {
    this.productApi.AddProduct(this.productForm.value);
    alert(
      this.productForm.controls['title'].value + ' successfully added!'
    );
    this.ResetForm();
  }
}
