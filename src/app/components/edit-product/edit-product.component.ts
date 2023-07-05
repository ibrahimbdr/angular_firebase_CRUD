import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from './../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  editForm: FormGroup;
  productId: string;
  constructor(
    private productApi: ProductService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit() {
    this.updateProductData();
    this.productId = this.actRoute.snapshot.paramMap.get('id');

    this.productApi
      .GetProduct(this.productId)
      .valueChanges()
      .subscribe((data) => {
        this.editForm.setValue(data);
      });
  }
  get brand() {
    return this.editForm.get('brand');
  }
  get price() {
    return this.editForm.get('price');
  }
  get title() {
    return this.editForm.get('title');
  }
  get images() {
    return this.editForm.get('images');
  }
  get categoryId() {
    return this.editForm.get('categoryId');
  }
  updateProductData() {
    this.editForm = this.fb.group({
      brand: ['', [Validators.required]],
      price: ['', [Validators.required]],
      title: ['', [Validators.required]],
      images: ['', [Validators.required]],
      categoryId: ['', [Validators.required]]
    });
  }
  goBack() {
    this.location.back();
  }
  updateForm() {
    console.log(this.editForm);

    this.productApi.UpdateProduct(this.editForm.value, this.productId);
    alert(
      this.editForm.controls['title'].value + ' updated successfully'
    );
    this.router.navigate(['view-products']);
  }
}
