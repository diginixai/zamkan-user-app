import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { ModalController } from '@ionic/angular';
import { AddresslistPage } from '../addresslist/addresslist.page';
import { BookingreviewPage } from '../bookingreview/bookingreview.page';
import { WhatincludedPage } from '../whatincluded/whatincluded.page';
import { DiginixService } from '../diginix.service';


@Component({
  selector: 'app-servicehomecleaning',
  templateUrl: './servicehomecleaning.page.html',
  styleUrls: ['./servicehomecleaning.page.scss'],
})
export class ServicehomecleaningPage implements OnInit {

  cleaners=[1,2,3,4,5];
  hours=[1,2,3,4,5,6,7,8]; 
  materials:any;
  additional:any;
  time:any;
  
  formvalue={
    form_id:0,
    form_type:'booking',
  	step:1,  // one for main form, two for second input, three for location
    booking_type:"Home Cleaning",
  	cleaners:null,
  	hours:null,
    materials:null,
    materials_index:null,
    additional_services:[],
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
	
  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	public modalController: ModalController,
    public diginix:DiginixService,
  	) { 


      this.use_latest_address();
      this.updateinfo();

  }


  calculate(){
    this.updateinfo();
    console.log(JSON.stringify(this.formvalue));
//    console.log(this.formvalue.materials);

    this.bill.printed_amount=0;
    this.bill.selling_amount=0;

    if(this.formvalue.cleaners!=null && this.formvalue.hours!=null){
    this.bill.printed_amount=this.formvalue.cleaners.base_printed*this.formvalue.hours.base_printed;
    this.bill.selling_amount=this.formvalue.cleaners.base_selling*this.formvalue.hours.base_selling;
    }

    if(this.formvalue.cleaners!=null && this.formvalue.hours!=null && this.formvalue.materials!=null){
    var material_index=this.formvalue.materials;
    this.bill.selling_amount=this.bill.selling_amount+( (this.formvalue.cleaners.size*this.formvalue.hours.size ) * this.formvalue.materials.base_selling );
    this.bill.printed_amount=this.bill.printed_amount+( (this.formvalue.cleaners.size*this.formvalue.hours.size ) * this.formvalue.materials.base_printed );
    }

    this.formvalue.bill=this.bill;
    
    this.updateinfo();
    console.log(this.formvalue);
    return true;
  }

  updateinfo(){

    this.formvalue.tax=this.tax;
    this.formvalue.msg=this.msg;

    var date = new Date(this.formvalue.booking_date);
    this.formvalue.booking_date_human=date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();

    var duration="";
    if(this.formvalue.hours!=null && this.formvalue.cleaners!=null){
    var duration=this.formvalue.hours.size+" Hours with "+this.formvalue.cleaners.size+" Cleaners";
    }

    this.formvalue.booking_details=[
      {
        'title':'Duration',
        'title_ar':'سيفا كي أفادي',
        'value':duration,
      },
      {
        'title':'Service frequency',
        'title_ar':'تردد الخدمة',
        'value':this.formvalue.frequency,
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

  }


  ngOnInit() {

  //  this.diginix.alert('thankyou','nishant');

  let received_dt:any={form_id:null,time:[""],what_included:"",rate:{tax:0,additional:null,materials:[],hours:[],cleaners:[]}};

    this.diginix.callapi("newpriceapis/homecleaning","Loading only...",{service_id:77}).then((d)=>{
      
      received_dt=d;
      this.cleaners=received_dt.rate.cleaners;
      this.hours=received_dt.rate.hours;
      this.materials=received_dt.rate.materials;
      this.formvalue.additional_services=received_dt.rate.additional;
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
 


  next(){

  	if(this.formvalue.step==1){

      if(this.formvalue.cleaners==null){
        this.diginix.toast("Cleaners not selected.",500);
        return false;
      }

      if(this.formvalue.hours==null){
        this.diginix.toast("Work hours not selected.",500);
        return false;
      }


  		this.formvalue.step=2;
      return true;


  	}else if(this.formvalue.step==2){



    if(this.formvalue.location.villa==""){
          this.diginix.toast("Address is missing.",500);
        return false;
    }


      if(this.formvalue.materials==null){
        this.diginix.toast("You have not selected the materials.",500);
        return false;
      }



  this.updateinfo();
  console.log(this.formvalue);
  window.localStorage.setItem('booking_data',JSON.stringify(this.formvalue));
	this.router.navigate(['/bookingreview'],{ queryParams: { } });
  	}
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

console.log(data);

}


}
