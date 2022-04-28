import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/models/Cart';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { CartService } from 'src/app/shared/services/cart.service';
import { ShopItemService } from 'src/app/shared/services/shop-item.service';
import { ShopItem } from '../../shared/models/ShopItem';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})

export class ShopComponent implements OnInit {

  shopItems: Array<ShopItem> = []
  constructor(
    private router: Router,
    private shopItemService: ShopItemService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getAllShopItems();
  }


  getAllShopItems() {
    const allItems=this.shopItemService.getAll().subscribe((data: ShopItem[]) => {
      allItems.unsubscribe();
      this.shopItems=data;
      for(let item of this.shopItems){
        this.shopItemService.loadImages(item.image+"").subscribe((data:string) => {
          item.image=data;
          
        })
      }
      
    })
  }

  getOrderedShopItems() {
    const allItems=this.shopItemService.getOrderedByAbc().subscribe((data: ShopItem[]) => {
      allItems.unsubscribe();
      this.shopItems=data;
      for(let item of this.shopItems){
        this.shopItemService.loadImages(item.image+"").subscribe((data:string) => {
          item.image=data;
        })
      }
      
    })
  }

  getFirstTenShopItem() {
    const allItems=this.shopItemService.getFistTen().subscribe((data: ShopItem[]) => {
      allItems.unsubscribe();
      this.shopItems=data;
      for(let item of this.shopItems){
        this.shopItemService.loadImages(item.image+"").subscribe((data:string) => {
          item.image=data;
        })
      }
      
    })
  }

  addItemToCart(shopItem: ShopItem) {
    const user=JSON.parse(localStorage.getItem('user') as string);
    const cart: Cart = {
      id: "",
      u_id:user.uid,
      shopItem_id:shopItem.id,
      date:  new Date().getTime()
    }
    
    this.cartService.create(cart).then(_=> {
      console.log("ShopItem succesfully added to cart!");
    }).catch(error => {
      console.log(error);
    });
  }

}
