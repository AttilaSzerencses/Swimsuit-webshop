import { Component, OnInit } from '@angular/core';
import { ShopItem } from 'src/app/shared/models/ShopItem';
import { CartService } from 'src/app/shared/services/cart.service';
import { ShopItemService } from 'src/app/shared/services/shop-item.service';
import { Cart } from '../../shared/models/Cart';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartEmpty = false
  cartItems: Array<Cart> = []
  shopItems: Array<ShopItem> = []
  constructor(
    private shopItemService: ShopItemService,
    private cartService: CartService,
    router: Router,
    @Inject(DOCUMENT) private domDocument: Document
  ) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.cartItems=[]
    this.shopItems=[]
    const user=JSON.parse(localStorage.getItem('user') as string);
    const allItems=this.cartService.getCartByUid(user.uid).subscribe(data => {
      allItems.unsubscribe();
      this.cartItems=data;
      this.isCartEmpty();
      this.getShopItemsFromCart();
    })
  }

  isCartEmpty(){
    if (this.cartItems.length==0){
      this.cartEmpty=true;
    } else {
      this.cartEmpty=false;
    }
  }

  getShopItemsFromCart(){
    for (let i =0; i < this.cartItems.length; i++){
      console.log("Shopitem.id"+this.cartItems[i].shopItem_id)
      const allItems=this.shopItemService.getById(this.cartItems[i].shopItem_id.trim()).subscribe(data => {
        allItems.unsubscribe();
        console.log("data: "+data);
        this.shopItems.push(data as ShopItem);
        for(let item of this.shopItems){
          this.shopItemService.loadImages(item.image+"").subscribe((data:string) => {
            item.image=data;     
          })
        }      
      })
    }
  }


  deleteFromCart(shopItemId: string){
    for (let i =0; i < this.cartItems.length; i++){
      const items = this.cartService.getById(this.cartItems[i].id).subscribe(data => {
        if(data?.shopItem_id == shopItemId){
          this.cartService.delete(data.id);
        }
      })
    }
    setTimeout(() => {this.domDocument.location.reload()}, 300); 
    }

}
