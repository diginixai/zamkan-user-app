import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { ModalController } from '@ionic/angular';
import { AddresslistPage } from '../addresslist/addresslist.page';
import { BookingreviewPage } from '../bookingreview/bookingreview.page';
import { WhatincludedPage } from '../whatincluded/whatincluded.page';
import { DiginixService } from '../diginix.service';

@Component({
  selector: 'app-shop-checkout',
  templateUrl: './shop-checkout.page.html',
  styleUrls: ['./shop-checkout.page.scss'],
})
export class ShopCheckoutPage implements OnInit {
  cartitmes:any;
  formvalue={
    fname:"",
    lname:"",
    email:"",
    phone:"",
    location:{
      villa:"",
      street:"",
      area_name:"",
      area:0,
      city_name:"",
      city_id:0,
      lat:"",
      lng:"",
      area_info:{name:""},
      city_info:{name:""},
    }
  }

  payment_method='cash';

  constructor(private route: ActivatedRoute,
  	private router: Router,
  	public modalController: ModalController,
    public diginix:DiginixService) {

        let user = JSON.parse(localStorage.getItem('user'));
        console.log('checkout',user);
        this.use_latest_address();
        this.getCarts();
        if(localStorage.getItem('user') !=null){
          this.formvalue.fname =user.name;
          this.formvalue.lname =user.last_name;
          this.formvalue.email =user.email;
          this.formvalue.phone =user.mobile;
        }
     }



  use_latest_address(){      // fetch address 

      var dx:any={
          villa:"",
          street:"",
          area_name:"",
          area:0,
          city_name:"",
          city_id:0,
          lat:"",
          lng:"",
          area_info:{name:""},
          city_info:{name:""},
        }
    
          this.diginix.callapi("profile/recentaddress/","",{},false).then((d)=>{
            if(d!=false){
              dx=d;
            this.formvalue.location=dx;
            }
          });
}


//Get carts

async getCarts(){
    
  this.diginix.callapi('user/get_cart',"Loading.",{},true).then((res)=>{
    this.cartitmes=res;
    console.log('cherck carts',res);
  });

}

async presentModal() {
  const modal = await this.modalController.create({
    component: AddresslistPage,
    cssClass: 'my-custom-class',
    componentProps: {
    address_history:[],
      selected_addres:{},
    }
  });
  await modal.present();

const { data } = await modal.onWillDismiss();
if(data.address){
this.formvalue.location=data.address;
}

if(data.fetch_new_address){
this.use_latest_address();
}

//console.log(data);

}

async orderNow(){

  if(this.formvalue.lname==null || this.formvalue.lname==''){
    this.diginix.toast("Last Name is required",500);
    return false;
  }
  if(this.formvalue.fname==null || this.formvalue.fname==''){
    this.diginix.toast("First Name is required",500);
    return false;
  }
  if(this.formvalue.email==null || this.formvalue.email==''){
    this.diginix.toast("Email is required",500);
    return false;
  }
  if(this.formvalue.phone==null || this.formvalue.phone==''){
    this.diginix.toast("Phone is required",500);
    return false;
  }
  console.log('this.formvalue.location',this.formvalue.location);

  let orderdata={

        fname: this.formvalue.fname,
        lname: this.formvalue.lname,
        email: this.formvalue.email,
        address1: this.formvalue.location.street+', '+this.formvalue.location.villa+', '+this.formvalue.location.area_info.name,
        address2: "",
        phone: this.formvalue.phone,
        city: this.formvalue.location.city_info.name,
        state: this.formvalue.location.city_info.name,
        country: this.formvalue.location.city_info.name,
        postal_code: "12345678",
        payment_method:this.payment_method
    }
   
  this.diginix.callapi('user/checkout',"Processing....",orderdata,true).then((res)=>{
    this.router.navigate(['/orderhistory'])
    //console.log('ccccccccf carts',res);
  });

}

  ngOnInit() {
  }

}
