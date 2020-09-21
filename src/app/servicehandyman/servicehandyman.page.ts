import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddresslistPage } from '../addresslist/addresslist.page';
import { BookingreviewPage } from '../bookingreview/bookingreview.page';
import { WhatincludedPage } from '../whatincluded/whatincluded.page';
import { DiginixService } from '../diginix.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-servicehandyman',
  templateUrl: './servicehandyman.page.html',
  styleUrls: ['./servicehandyman.page.scss'],
})
export class ServicehandymanPage implements OnInit {


 work=[];
 rates={
 	general_work:[],
 	furniture_assembly:[],
	curtain_hanging:[],
	lightbulbs_and_lighting:[],
	ac_repair:[],
 	ac_installation:[],
 	tv_mounting:[],
 	electrical_work:[],
 	plumbing:[]
 }

  
  time:any;

  formvalue={
  	hrs_size:{size:'',title:'',title_ar:'',base_selling:'',base_printed:''},
  	service_type:'general_work',
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


  	this.route
      .queryParams
      .subscribe(params => {
      	
       // this.name=params.name;
       if(params.service_type){
       console.log('service_type_found',params.service_type);
       this.formvalue.service_type=params.service_type;
   		}
      });



  //  this.diginix.alert('thankyou','nishant');

  let received_dt:any={form_id:null,time:[""],what_included:"",rate:{tax:0,additional:null,materials:[],hours:[],cleaners:[]}};

    this.diginix.callapi("newpriceapis/handyman","Loading...",{}).then((d)=>{
      
      received_dt=d;

       	 this.work=received_dt.rate.work;
		 this.rates.general_work=received_dt.rate.general_work;
		 this.rates.furniture_assembly=received_dt.rate.furniture_assembly;
		 this.rates.curtain_hanging=received_dt.rate.curtain_hanging;
		 this.rates.lightbulbs_and_lighting=received_dt.rate.lightbulbs_and_lighting;
		 this.rates.ac_repair=received_dt.rate.ac_repair;
		 this.rates.ac_installation=received_dt.rate.ac_installation;
		 this.rates.tv_mounting=received_dt.rate.tv_mounting;
		 this.rates.electrical_work=received_dt.rate.electrical_work;
		 this.rates.plumbing=received_dt.rate.plumbing;

      this.tax=received_dt.rate.tax;
      this.what_included=received_dt.what_included;
      this.time=received_dt.time;
      this.formvalue.booking_time=received_dt.time[0];
      this.formvalue.form_id=received_dt.form_id;


    }).catch((e)=>{
      console.log(e);
    })







  }




formswitch(wk){
	this.formvalue.service_type=wk.code;
	this.hrs_reset();
	this.calculate();
}

updateinfo(){

    this.formvalue.tax=this.tax;
    this.formvalue.msg=this.msg;

    var date = new Date(this.formvalue.booking_date);
    this.formvalue.booking_date_human=date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();

    var name_of_work="";

   this.work.forEach((value, key, index) => {
		if(value.code<=this.formvalue.service_type){
			name_of_work=value.title;
		}
    });

 

    this.formvalue.booking_details=[
      {
        'title':'Type of Service',
        'title_ar':'سيفا كي أفادي',
        'value':name_of_work,
      },
      {
        'title':'Number of Hours',
        'title_ar':'عدد الساعات',
        'value':this.formvalue.hrs_size.title,
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
    //console.log(this.formvalue);

    this.updateinfo();
    
    this.bill.printed_amount=0;
    this.bill.selling_amount=0;

if(this.formvalue.hrs_size.size==""){
	return false;
}


this.bill.printed_amount=this.formvalue.hrs_size.base_printed;
this.bill.selling_amount=this.formvalue.hrs_size.base_selling;

this.formvalue.bill=this.bill;
console.log('formvaluebill',this.formvalue.bill);
return true;
  }





next(){


	if(this.formvalue.booking_date==null){
          this.diginix.toast("Booking date not selected.",500);
        return false;
    }

    if(this.formvalue.booking_time==null){
          this.diginix.toast("Booking time not selected.",500);
        return false;
    }

    if(this.formvalue.hrs_size.size==""){
          this.diginix.toast("Please select service duration.",500);
        return false;
    }


//console.log('value_before_sending',this.formvalue);
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


hrs_reset(){
	this.formvalue.hrs_size={size:'',title:'',title_ar:'',base_selling:'',base_printed:''}
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
