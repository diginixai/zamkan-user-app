import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddresslistPage } from '../addresslist/addresslist.page';
import { BookingreviewPage } from '../bookingreview/bookingreview.page';
import { WhatincludedPage } from '../whatincluded/whatincluded.page';
import { DiginixService } from '../diginix.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-servicebookatruck',
  templateUrl: './servicebookatruck.page.html',
  styleUrls: ['./servicebookatruck.page.scss'],
})
export class ServicebookatruckPage implements OnInit {



  apartment=[{size:'Studio',base:'0'},{size:'1 BHK',base:'0'},{size:'2 BHK',base:'0'},{size:'3 BHK',base:'0'},{size:'4 BHK',base:'0'}];
  villa=[{size:'2 BHK',base:'0'},{size:'3 BHK',base:'0'},{size:'4 BHK',base:'0'},{size:'5 BHK',base:'0'}];

	time:any;


  base_rate:any={base_selling:"0"};
  formvalue={
    room_type:'',
    room_size:'',
  	form_id:36,
    form_type:'enquiry',
  	step:1,  // one for main form, two for second input, three for location
    booking_type:"Book a Truck",
  	images:[],
    additional_services:null,
    additional_index:null,
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
  	booking_time:'',
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

    this.diginix.callapi("newpriceapis/bookatruck","Loading only...",{service_id:this.formvalue.form_id}).then((d)=>{
      
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

    // var additional_services_text="";
    // this.additional.forEach((value, key, index) => {
    //   if(value.checked==true){
    //   if(additional_services_text==""){
    //     additional_services_text=value.title;
    //   }else{
    //     additional_services_text=additional_services_text+", "+value.title;
    //   }
    //   }

    // });

    // if(additional_services_text==""){
    //   additional_services_text="no";
    // }


    this.formvalue.booking_details=[
      {
        'title':'Service',
        'title_ar':'نوع الخدمة',
        'value':this.formvalue.booking_type,
      },
      {
        'title':'Service Date',
        'title_ar':'تاريخ الخدمة',
        'value':this.formvalue.booking_date_human,
      },
      {
        'title':'Service Time',
        'title_ar':'وقت الخدمة',
        'value':this.formvalue.booking_time,
      },

      {
        'title':'Moving From',
        'title_ar':'الانتقال من',
        'value':this.formvalue.location.villa+" "+this.formvalue.location.street+" "+this.formvalue.location.area_info.name+" "+this.formvalue.location.city_info.name,
      },

      {
        'title':'Moving to',
        'title_ar':'الانتقال إلى',
        'value':this.formvalue.location_end.villa+" "+this.formvalue.location_end.street+" "+this.formvalue.location_end.area_info.name+" "+this.formvalue.location_end.city_info.name,
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
    this.bill.selling_amount=this.base_rate.base_selling;


    this.formvalue.bill=this.bill;
    console.log('calculate called',this.formvalue);
    return true;
}



next(){


    if(this.formvalue.location_end.villa==""){
          this.diginix.toast("Moving to is missing.",500);
        return false;
    }

    

      if(this.formvalue.booking_date==''){
        this.diginix.toast("Booking date not selected..",500);
        return false;
      }

      if(this.formvalue.booking_time==''){
        this.diginix.toast("Booking time not selected..",500);
        return false;
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
