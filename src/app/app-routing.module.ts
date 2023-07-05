import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/register-product', pathMatch: 'full' },
  { path: 'register-product', component: AddProductComponent },
  { path: 'view-products', component: ProductListComponent },
  { path: 'edit-product/:id', component: EditProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
