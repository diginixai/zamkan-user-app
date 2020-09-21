import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddresslistPage } from '../addresslist/addresslist.page';
import { BookingreviewPage } from '../bookingreview/bookingreview.page';
import { WhatincludedPage } from '../whatincluded/whatincluded.page';
import { DiginixService } from '../diginix.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-servicesanitization',
  templateUrl: './servicesanitization.page.html',
  styleUrls: ['./servicesanitization.page.scss'],
})
export class ServicesanitizationPage implements OnInit {

  apartment=[];
  villa=[]; 
  office=[];
  room_type=[];


  
  time:any;

  formvalue={
  	room_type:"apartment",
  	room_size:{size:'',base:0},
  	service_type:'cleaning_sanitization',
  	office_area:0,
    form_id:0,
    form_type:'booking',
  	step:1,  // one for main form, two for second input, three for location
    booking_type:"Deep Cleaning",
  	apartment:null,
  	villa:null,
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
  	frequency:'once',
  	booking_date:new Date().toISOString(),
    booking_date_human:null,
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

  this.use_latest_address();

}

  ngOnInit() {


  //  this.diginix.alert('thankyou','nishant');

  let received_dt:any={form_id:null,time:[""],what_included:"",rate:{tax:0,additional:null,materials:[],hours:[],cleaners:[]}};

    this.diginix.callapi("newpriceapis/sanitizationservice","Loading only...",{service_id:77}).then((d)=>{
      
      received_dt=d;
      this.apartment=received_dt.rate.apartment;
      this.villa=received_dt.rate.villa;
      this.office=received_dt.rate.office;
      this.room_type=received_dt.rate.room_type;

      this.tax=received_dt.rate.tax;
      this.what_included=received_dt.what_included;
      this.time=received_dt.time;
      this.formvalue.booking_time=received_dt.time[0];
      this.formvalue.form_id=received_dt.form_id;


    }).catch((e)=>{
      console.log(e);
    })



  	this.route
      .queryParams
      .subscribe(params => {
       // this.name=params.name;
       this.formvalue.form_id=params.form_id
      });




  }




updateinfo(){

    this.formvalue.tax=this.tax;
    this.formvalue.msg=this.msg;
    this.formvalue.additional_services=this.additional;

    var date = new Date(this.formvalue.booking_date);
    this.formvalue.booking_date_human=date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();

    if(this.formvalue.room_type=="office"){

    	var rs={
        'title':'Office Size',
        'title_ar':'حجم الغرفة',
        'value':this.formvalue.office_area+" SQ. FT." ,
      	}
    }else{

    	var rs={
        'title':'Room Size',
        'title_ar':'حجم الغرفة',
        'value':this.formvalue.room_size.size,
      },
    }



    this.formvalue.booking_details=[
      {
        'title':'Type of Place',
        'title_ar':'سيفا كي أفادي',
        'value':this.formvalue.room_type,
      },
      rs,
      {
        'title':'Type of service',
        'title_ar':'نوع الخدمة',
        'value':this.formvalue.service_type,
      },
      {
        'title':'Service Date',
        'title_ar':'تاريخ الخدمة',
        'value':this.formvalue.booking_date_human,
      },
      {
        'title':'Address',
        'title_ar':'عنوان',
        'value':this.formvalue.location.villa+" "+this.formvalue.location.street+" "+this.formvalue.location.area_info.name+" "+this.formvalue.location.city_info.name,
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
    console.log(this.formvalue);

    this.updateinfo();
    console.log(JSON.stringify(this.formvalue));
    
    this.bill.printed_amount=0;
    this.bill.selling_amount=0;

if(this.formvalue.room_type=="office"){

	var area=this.formvalue.office_area;

	this.office.forEach((value, key, index) => {
		if(value.from<=area && value.to>=area){
			this.room_size=value;
			this.bill.printed_amount=area*value[this.formvalue.service_type].base_printed;
			this.bill.selling_amount=area*value[this.formvalue.service_type].base_selling;
		}
    });


}else{



    if(this.formvalue.room_size==null || this.formvalue.room_size.size==""){
    	return false;
    }
    var selected_service_type=this.service_type;
    this.bill.printed_amount=this.formvalue.room_size[this.formvalue.service_type].base_printed;
    this.bill.selling_amount=this.formvalue.room_size[this.formvalue.service_type].base_selling;
    this.formvalue.bill=this.bill;
    
}




    this.updateinfo();
    console.log(this.formvalue);
    return true;
  }


reset_room(){
	this.formvalue.room_size={size:'',base:0};
}


next(){




    if(this.formvalue.location.villa==""){
          this.diginix.toast("Address is missing.",500);
        return false;
    }

    if(this.formvalue.room_type=='office'){

    	if(this.formvalue.office_area=='' || this.formvalue.office_area==0){
        this.diginix.toast("Office area not entered.",500);
        return false;
      }


    }else{
      if(this.formvalue.room_size.size==''){
        this.diginix.toast("Room size not selected.",500);
        return false;
      }
  }

  this.updateinfo();
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


reset_room(){
	this.formvalue.room_size={size:'',title:'',title_ar:'',cleaning_sanitization:{},sanitization:{}};
}


use_latest_address(){   
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
        this.formvalue.location=dx;
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
  this.use_latest_address();

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
