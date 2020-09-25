import { Animation, AnimationController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { DiginixService } from '../diginix.service';
import { LoadingController,MenuController,ModalController }  from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shop-order-detail',
  templateUrl: './shop-order-detail.page.html',
  styleUrls: ['./shop-order-detail.page.scss'],
})
export class ShopOrderDetailPage implements OnInit {

  orders:any;

  constructor(private fb: FormBuilder,
              private router: Router,
              public diginix:DiginixService,
              public modalCtrl:ModalController,
              public activeroute:ActivatedRoute) {
                
                let id = this.activeroute.snapshot.paramMap.get('id');
                this.orederDetail();

               }

  ngOnInit() {
    
  }

  async orederDetail(){
      this.orders = JSON.parse(localStorage.getItem('zamakan_orderdetail'));
      console.log('orders',this.orders);
  }
  // async getCarts(){
    
  //   this.diginix.callapi('user/get_cart',"Loading.",{},true).then((res)=>{
  //     this.cartitmes=res;
  //     console.log('cherck carts',res);
  //   });

  // }


  backtoShop(){
    this.router.navigate(['shop'])
  }

}
