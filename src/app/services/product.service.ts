import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsCollection: AngularFirestoreCollection<IProduct>;
  productDoc: AngularFirestoreDocument<IProduct>;

  constructor(private firestore: AngularFirestore) {
    this.productsCollection = this.firestore.collection<IProduct>('products-list');
  }

  // Create Product
  AddProduct(product: IProduct) {
    this.productsCollection.add(product);
  }

  // Fetch Single Product Object
  GetProduct(id: string): AngularFirestoreDocument<IProduct> {
    this.productDoc = this.firestore.doc<IProduct>('products-list/' + id);
    return this.productDoc;
  }

  // Fetch Products List
  GetProductsList(): Observable<IProduct[]> {
    return this.productsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IProduct;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  // Update Product Object
  UpdateProduct(product: IProduct, id: string) {
    this.productDoc = this.firestore.doc<IProduct>('products-list/' + id);
    this.productDoc.update(product);
  }

  // Delete Product Object
  DeleteProduct(id: string) {
    this.productDoc = this.firestore.doc<IProduct>('products-list/' + id);
    this.productDoc.delete();
  }
}
