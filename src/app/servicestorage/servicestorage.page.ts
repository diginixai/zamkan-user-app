import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddresslistPage } from '../addresslist/addresslist.page';
import { BookingreviewPage } from '../bookingreview/bookingreview.page';
import { WhatincludedPage } from '../whatincluded/whatincluded.page';
import { DiginixService } from '../diginix.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-servicestorage',
  templateUrl: './servicestorage.page.html',
  styleUrls: ['./servicestorage.page.scss'],
})
export class ServicestoragePage implements OnInit {




  storage_type=[{size:'personal_storage',title:'Personal Storage',title_ar:'التخزين الشخصي'},
  {size:'commercial_storage',title:'Commercial Storage',title_ar:'التخزين التجاري'}];

  what_to_store=[{size:'furniture_personal_item',title:'Furniture/Personal Items',title_ar:'الأثاث / الأغراض الشخصية'},
  {size:'car',title:'Car',title_ar:'سيارة'},
  {size:'perishable_items',title:'Perishable Items',title_ar:'العناصر القابلة للتلف'},
  {size:'documents',title:'Documents',title_ar:'مستندات'},
  {size:'other',title:'Other',title_ar:'آخر'}
  ];


  how_much_storage=[
  {size:'10_sq_ft',title:'10 Square Feet',title_ar:'10 قدم مربع'},
  {size:'25_sq_ft',title:'25 Square Feet',title_ar:'25 قدم مربع'},
  {size:'50_sq_ft',title:'50 Square Feet',title_ar:'50 قدم مربع'},
  {size:'75_sq_ft',title:'75 Square Feet',title_ar:'75 قدم مربع'},
  {size:'100_sq_ft',title:'100 Square Feet',title_ar:'100 قدم مربع'},
  {size:'150_sq_ft',title:'150 Square Feet',title_ar:'150 قدم مربع'},
  {size:'250_sq_ft_bigger',title:'250 Square Feet and bigger',title_ar:'250 قدم مربع وأكبر'},
  ];


  also_needed=[
  {size:'packing',title:'Packing',title_ar:'التعبئة'},
  {size:'pickup_and_delivery',title:'Pick up and delivery',title_ar:'الاستلام والتسليم'},
  {size:'redelivery_to_final_destination',title:'Redelivery to final destination',title_ar:'إعادة التسليم إلى الوجهة النهائية'},
  {size:'climate_controlled_storage',title:'Climate Controlled Storage',title_ar:'التخزين المتحكم في المناخ'},
  {size:'24_hr_access',title:'24 hour access',title_ar:'دخول 24 ساعة'},
  {size:'cold_storage_for_perishable',title:'Cold Storage ( for perisable items )',title_ar:'التخزين البارد (للعناصر القابلة للتلف)'}
  ];



  time:any;
  
  formvalue={
    storage_type:'Personal Storage',
    what_to_store:[],
    how_much_storage:'10 Square Feet',
    additional_services:[],
  	form_id:37,
    form_type:'enquiry',
  	step:1,  // one for main form, two for second input, three for location
    booking_type:"Storage Services",
  	images:[],
    additional_index:null,
    start_country:"",
    start_address:"",
    destination_country:"",
    destination_address:"",
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
    },
    location_end:{
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
    },
  	booking_date:new Date().toISOString(),
    booking_date_human:null,
    booking_date_end:new Date().toISOString(),
    booking_date_end_human:null,
  	booking_time:null,
    msg:null,
    bill:{},
    tax:null,
    booking_details:[],

  }





  constructor(private route: ActivatedRoute,
  	private router: Router,
  	public modalController: ModalController,
    public diginix:DiginixService,
    private camera: Camera,) { 

  this.use_latest_address('location');

}

ngOnInit() {


 	 	this.route
      .queryParams
      .subscribe(params => {
       // this.name=params.name;
       this.formvalue.form_id=params.form_id
      });


  //  this.diginix.alert('thankyou','nishant');

  let received_dt:any={form_id:null,time:[""],what_included:"",rate:{tax:0,additional:null,materials:[],hours:[],cleaners:[]}};

    this.diginix.callapi("newpriceapis/storageservices","Loading only...",{service_id:this.formvalue.form_id}).then((d)=>{
      
      received_dt=d;
      this.tax=received_dt.rate.tax;
      this.what_included=received_dt.what_included;
      this.time=received_dt.time;
      this.formvalue.booking_time=received_dt.time[0];
      this.formvalue.form_id=received_dt.form_id;
      this.base_rate=received_dt.rate.base;

    }).catch((e)=>{
      console.log(e);
    })



 
    this.calculate();



  }




updateinfo(){

    this.formvalue.tax=this.tax;
    this.formvalue.msg=this.msg;
    

    var date = new Date(this.formvalue.booking_date);
    this.formvalue.booking_date_human=date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
    var date_end = new Date(this.formvalue.booking_date_end);
    this.formvalue.booking_date_end_human=date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();



    var what_to_store_text="";
    this.what_to_store.forEach((value, key, index) => {
    	if(value.checked===true){
    		what_to_store_text=what_to_store_text+", "+value.title;
    	}
    });


    var additional_services="";
    this.also_needed.forEach((value, key, index) => {
    	if(value.checked===true){
    		additional_services=additional_services+", "+value.title;
    	}
    });


    this.formvalue.booking_details=[
      {
        'title':'Service',
        'title_ar':'نوع الخدمة',
        'value':this.formvalue.booking_type,
      },
      {
        'title':'Type of Storage',
        'title_ar':'نوع التخزين',
        'value':this.formvalue.storage_type,
      },

      {
        'title':'What to store?',
        'title_ar':'ماذا تخزن؟',
        'value':what_to_store_text,
      },

      {
        'title':'How much storage needed?',
        'title_ar':'ماذا تخزن؟',
        'value':this.formvalue.how_much_storage,
      },

      {
        'title':'Additional Services?',
        'title_ar':'خدمات إضافية؟',
        'value':additional_services,
      },

      {
        'title':'Require storage service from date',
        'title_ar':'تتطلب خدمة التخزين من التاريخ',
        'value':this.formvalue.booking_date_human,
      },
      {
        'title':'Require storage service till date',
        'title_ar':'تتطلب خدمة التخزين من التاريخ',
        'value':this.formvalue.booking_date_end_human,
      },
      {
        'title':'Notes',
        'title_ar':'ملاحظات',
        'value':this.msg,
      },
    ]
console.log(this.formvalue);
  }




calculate(){
    this.updateinfo();
    console.log(JSON.stringify(this.formvalue));
    
    this.bill.printed_amount=0;
    this.bill.selling_amount=0;

    //var base_price=this.formvalue.base_rate
    //this.bill.selling_amount=this.base_rate.base_selling;


    this.formvalue.bill=this.bill;
    console.log('calculate called',this.formvalue);
    return true;
}



next(){
console.log('this is it',this.also_needed);



var what_to_store_text="";
    this.what_to_store.forEach((value, key, index) => {
    	if(value.checked===true){
    		what_to_store_text=what_to_store_text+", "+value.title;
    	}
    });
if(what_to_store_text==""){
	this.diginix.toast("Please select what you need to store.",500);
}



  this.updateinfo();
  console.log(this.formvalue);
  
  window.localStorage.setItem('booking_data',JSON.stringify(this.formvalue));
  this.router.navigate(['/bookingreview'],{ queryParams: { } });
  



}























// some core but important functions 


msg:any;
  tax:any;
  bill:any={
    printed_amount:0,
    selling_amount:0,
    currency:"AED",
  }

  what_included:any={image:null};



gohome(){ this.router.navigate(['/home'],{}); }
async whats_included(){
    const modal = await this.modalController.create({
      component: WhatincludedPage,
      cssClass: 'my-custom-class',
      componentProps: {
      what_included:this.what_included,
      }
    });
    await modal.present();
}



use_latest_address(typ){   
   // fetch address 
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

        this.formvalue[typ]=dx;
      }
        
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
  this.use_latest_address('location');
}


}




   async presentModal_moving_to() {
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
this.formvalue.location_end=data.address;

}

if(data.fetch_new_address){
  this.use_latest_address('location_end');
}


}




delete_photo(inputname,i){
          this.formvalue[inputname].splice(i, 1);
}


capture_photo(inputname){


                    if(this.formvalue[inputname].length>3){
this.diginix.alert(this.diginix.translate("Alert","إنذار"),this.diginix.translate("Maximum 3 Photos are allowed.","يسمح بحد أقصى 3 صور."));
                                        return false;
                    }



const options: CameraOptions = {
quality: 80,
destinationType: this.camera.DestinationType.DATA_URL,
encodingType: this.camera.EncodingType.JPEG,
targetWidth : 400,
correctOrientation: true
}



                    this.camera.getPicture(options).then((imageData) => {


                      this.diginix.callapi("upload/save/",this.diginix.translate("Sending Image...","إرسال الصورة ..."),{image:imageData},true).then((file)=>{
                        console.log(file);
                        this.formvalue[inputname].push(file);
                      }).catch((e)=>{

                        console.log(e);

                      });

                      
                      

                      
                    }, (err) => {

                    });



}



}
