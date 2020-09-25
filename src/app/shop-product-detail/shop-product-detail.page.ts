import { Animation, AnimationController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { DiginixService } from '../diginix.service';
import { LoadingController,MenuController,ModalController }  from '@ionic/angular';

@Component({
  selector: 'app-shop-product-detail',
  templateUrl: './shop-product-detail.page.html',
  styleUrls: ['./shop-product-detail.page.scss'],
})
export class ShopProductDetailPage implements OnInit {

   puductdetails:any;

   imgConfig = {
    spaceBetween: 3,
    slidesPerView: 1,
    centeredSlides: true
  };

  relatedConfig = {
    spaceBetween: 2,
    slidesPerView: 2,
  };
  
  relatedProduct:any;

  constructor(private router: Router,
    public diginix:DiginixService,
    public modalCtrl:ModalController,
    public menu: MenuController,
    public activeroute:ActivatedRoute) { 

      let id = this.activeroute.snapshot.paramMap.get('id');
      this.getProduct();
      this.reletedProducts(id);
      

    }

    // async getProductDetails(id){

    //   this.diginix.callapi('serviceprovider/getProductById',"Loading",{id:id},true).then((res)=>{
    //     this.puductdetails=res;
    //     console.log('chec product',res);
    //   });
  
    // }

    async productDetail(product){
   
      localStorage.setItem('zamkan_product',JSON.stringify(product));
      this.router.navigate(['/product-detail',product.id]);
    }

    async reletedProducts(id){

      this.diginix.callapi('serviceprovider/getrelated_products',"Loading",{id:id},false).then((res)=>{
        this.relatedProduct = res;
        console.log('relatedProduct',res);
      });
  
    }

    async getProduct(){
      this.puductdetails = JSON.parse(localStorage.getItem('zamkan_product'));
      
    }
    addTocart(id){
       let items = {
          id:id,
          quantity:1
       }
      this.diginix.callapi('user/add_cart',"Loading",{items:{items}},true).then((res)=>{
        //this.puductdetails=res;
        this.diginix.toast("Added successfully.",500);
        this.router.navigate(['/shop']);
        console.log('chec product',res);
      });
    }

  ngOnInit() {
  }

}
