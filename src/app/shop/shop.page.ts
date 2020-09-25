import { Animation, AnimationController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiginixService } from '../diginix.service';
import { LoadingController,MenuController,ModalController }  from '@ionic/angular';
import { ShopCategoryFilterPage } from '../shop-category-filter/shop-category-filter.page';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  layout = 'grid';
  public products:any;
  public selectedIndex = 0;
  public listcategory:any;

  public keyword:string;
  public sortby="0";
  public search_text:string;
  public seletedcategories=[];
  public cartitmes:any;
  enable_checkout:boolean=true;
 
  constructor(private router: Router,
              public diginix:DiginixService,
              public modalCtrl:ModalController,
              public menu: MenuController) { 

            this.getProductDetails();
            this.getCategories();
            this.getCarts();
  }

  ionViewWillEnter(){
    this.getCarts();
  }
  

  ngOnInit()  {

  }

  async getProductDetails(){

    this.diginix.callapi('serviceprovider/getAllActiveProducts',"",{},true).then((res)=>{
      this.products=res;
      ///console.log('chec product',res);
    });

  }

  async getCategories(){

    this.diginix.callapi('serviceprovider/getMainCategory',"",{},true).then((res)=>{
      this.listcategory=res;
     // console.log('chec Categories',res);
    });

  }

  // Get Cart Cart

  async getCarts(){
    
    this.diginix.callapi('user/get_cart',"",{},true).then((res)=>{
      this.cartitmes=res;
      if(this.cartitmes.cart_data.length == 0){
        this.enable_checkout = false;
      }
      else{
        this.enable_checkout = true;
      }
      //console.log('cherck carts',res);
    });

  }

  async getProductAllFilter(){

    let filterdata ={
        category_id:this.seletedcategories,
        keyword:this.keyword,
        sort:this.sortby
    }
    this.diginix.callapi('serviceprovider/getProductByCategoryId',"loading..",filterdata,true).then((res)=>{
      this.products=res;
      //console.log('chec product',res);
    });

  }
  sortByfilter(){
    this.getProductAllFilter();
  }

  cart(){
      this.router.navigate(['/cart'])
  }
  searchListings(newObj) {
    this.keyword = this.search_text;
    this.getProductAllFilter();
    //console.log('check serch funct',this.search_text)
  }
  changeView(param) {
    switch (param) {
      case 'grid':
        this.layout = 'grid';
        break;
      case 'card':
        this.layout = 'card';
        break;
      default:
        this.layout = 'grid';
        break;
    }
  }
async productDetail(product){
   
  localStorage.setItem('zamkan_product',JSON.stringify(product));
  this.router.navigate(['/product-detail',product.id]);
}
checkout(){
  if(this.enable_checkout == false){
    this.diginix.toast("Cart is empty",500);
    return;
  }
  this.router.navigate(['checkout'])
}
  async categoriesfilter() {
     
    const modal = await this.modalCtrl.create({
      component: ShopCategoryFilterPage,
      componentProps: { list:this.listcategory },
      mode:"ios",
      
    });

      modal.onDidDismiss()
      .then((data) => {
        //this.compdetails = data.data;
        this.seletedcategories = data.data;
        //console.log('data filetr',data)
        this.getProductAllFilter();
    });
    return await modal.present();
  }
}
