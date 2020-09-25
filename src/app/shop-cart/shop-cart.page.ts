import { Animation, AnimationController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiginixService } from '../diginix.service';
import { LoadingController,MenuController,ModalController }  from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.page.html',
  styleUrls: ['./shop-cart.page.scss'],
})
export class ShopCartPage implements OnInit {

  cartitmes:any;
  couponForm: FormGroup;
  enable_checkout:boolean=true;

  constructor(private fb: FormBuilder,
              private router: Router,
              public diginix:DiginixService,
              public modalCtrl:ModalController) {
                    
                this.getCarts();
               }

  ionViewWillEnter(){
    this.getCarts();
}

  ngOnInit() {
    
  }

  
  async getCarts(){
    
    this.diginix.callapi('user/get_cart',"Loading.",{},true).then((res)=>{
      this.cartitmes=res;
      if(this.cartitmes.cart_data.length == 0){
        this.enable_checkout = false;
      }
      else{
        this.enable_checkout = true;
      }
    });

  }
  checkout(){
    
      if(this.enable_checkout == false){
        this.diginix.toast("Cart is empty",500);
        return;
      }
      this.router.navigate(['checkout'])
  }
  async remeoveItems(key){
       let cart_key={
        cart_key:key
       }
    this.diginix.callapi('user/remove_cart',"remove cart..",cart_key,true).then((res)=>{
      //this.cartitmes=res;
      this.cartitmes=res;
      this.diginix.toast("Item has been removed.",500);
      console.log('Remove Cart',res);
      
    });
  }
 

}
