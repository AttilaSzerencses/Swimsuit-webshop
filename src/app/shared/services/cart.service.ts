import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Cart} from "../models/Cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  collectionName = 'Cart';
  constructor(private afs: AngularFirestore) { }

  create(cart: Cart){
    cart.id=this.afs.createId();
    return this.afs.collection<Cart>(this.collectionName).doc(cart.id).set(cart);
  }

  getAll(){
    return this.afs.collection<Cart>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<Cart>(this.collectionName).doc(id).valueChanges();
  }

  getCartByUid(uid: string) {
    return this.afs.collection<Cart>(this.collectionName,ref => ref.where('u_id','==',uid)).valueChanges();
  }

  delete(id: string) {
    return this.afs.collection<Cart>(this.collectionName).doc(id).delete();
  }

  deleteByShopItemId(id: string) {
    return this.afs.collection<Cart>(this.collectionName,ref => ref.where('shopItem_id','==',id)).doc(id).delete();
  }


}
