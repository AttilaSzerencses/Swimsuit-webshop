import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {ShopItem} from "../models/ShopItem";
@Injectable({
  providedIn: 'root'
})
export class ShopItemService {

  collectionName = "ShopItems";

  constructor(private afs: AngularFirestore,private storage: AngularFireStorage,) { }

loadImages(image: string): Observable<string>{
  return this.storage.ref(image).getDownloadURL();
}

create(shopItem: ShopItem){
  return this.afs.collection<ShopItem>(this.collectionName).doc(shopItem.id).set(shopItem);
}

getAll(){
  return this.afs.collection<ShopItem>(this.collectionName).valueChanges();
}

getFistTen(){
  return this.afs.collection<ShopItem>(this.collectionName,ref => ref.limit(10)).valueChanges();
}

getOrderedByAbc(){
  return this.afs.collection<ShopItem>(this.collectionName,ref => ref.orderBy("name","asc")).valueChanges();
}

getById(id: string){
  return this.afs.collection<ShopItem>(this.collectionName).doc(id).valueChanges();
}


}
