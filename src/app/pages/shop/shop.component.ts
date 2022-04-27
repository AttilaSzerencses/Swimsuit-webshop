import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
          console.log(data);
          
        })
      }
      
    })
  }

  addItemToCart() {

  }

}
