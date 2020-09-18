import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddresslistPage } from '../addresslist/addresslist.page';
import { BookingreviewPage } from '../bookingreview/bookingreview.page';
import { WhatincludedPage } from '../whatincluded/whatincluded.page';
import { DiginixService } from '../diginix.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-servicedeepcleaning',
  templateUrl: './servicedeepcleaning.page.html',
  styleUrls: ['./servicedeepcleaning.page.scss'],
})
export class ServicedeepcleaningPage implements OnInit {


  
  apartment=[];
  villa=[]; 
  materials:any;
  additional:any=[{title:'Steam Cleaning',title_ar:'تنظيف التيار',slug:'steam'},{title:'Grout Cleaning',title_ar:'تنظيف الجص',slug:'grout'}];
  
  time:any;

  formvalue={
  	room_type:"apartment",
  	room_size:{size:'',base:0},
  	room_furnished:"no",
    form_id:0,
  	step:1,  // one for main form, two for second input, three for location
    booking_type:"Deep Cleaning",
  	apartment:null,
  	villa:null,
    images:[],
    additional_services:null,
    additional_index:null,
    location:null,
  	frequency:'once',
  	booking_date:new Date().toISOString(),
    booking_date_human:null,
  	cleaning_time:null,
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
    private camera: Camera,
    ) { 

     this.use_latest_address();

    }

  ngOnInit() {


  //  this.diginix.alert('thankyou','nishant');

  let received_dt:any={form_id:null,time:[""],what_included:"",rate:{tax:0,additional:null,materials:[],hours:[],cleaners:[]}};

    this.diginix.callapi("newpriceapis/deepcleaning","Loading only...",{service_id:77}).then((d)=>{
      
      received_dt=d;
      this.apartment=received_dt.rate.apartment;
      this.villa=received_dt.rate.villa;

      this.tax=received_dt.rate.tax;
      this.what_included=received_dt.what_included;
      this.time=received_dt.time;
      this.formvalue.cleaning_time=received_dt.time[0];
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

    var additional_services_text="";
    this.additional.forEach((value, key, index) => {
    	if(value.checked==true){
    	if(additional_services_text==""){
    		additional_services_text=value.title;
    	}else{
    		additional_services_text=additional_services_text+", "+value.title;
    	}
    	}

    });

    if(additional_services_text==""){
      additional_services_text="no";
    }


    this.formvalue.booking_details=[
      {
        'title':'Type of House',
        'title_ar':'سيفا كي أفادي',
        'value':this.formvalue.room_type,
      },
      {
        'title':'Room Size',
        'title_ar':'حجم الغرفة',
        'value':this.formvalue.room_size.size,
      },
      {
        'title':'Is home furnished?',
        'title_ar':'هل المنزل مفروش؟',
        'value':this.formvalue.room_furnished,
      },
      {
        'title':'Additonal Services',
        'title_ar':'خدمات إضافية',
        'value':additional_services_text,
      },
      {
        'title':'Service Date',
        'title_ar':'تاريخ الخدمة',
        'value':this.formvalue.booking_date_human,
      },
      {
        'title':'Service Time',
        'title_ar':'وقت الخدمة',
        'value':this.formvalue.cleaning_time,
      },

      {
        'title':'Address',
        'title_ar':'عنوان',
        'value':this.location.villa+" "+this.location.street+" "+this.location.area_name+" "+this.location.city_name,
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
//    console.log(this.formvalue.materials);

    this.bill.printed_amount=0;
    this.bill.selling_amount=0;

    if(this.formvalue.room_size==null || this.formvalue.room_size.size==""){
    	return false;
    }


    var base_price=this.formvalue.room_size.base;
    this.bill.selling_amount=base_price;


    // check additional services 
    var additional_service_price=0;
    this.additional.forEach((value, key, index) => {
    	if(value.checked && value.checked==true){
    		additional_service_price=this.formvalue.room_size[value.slug];
    	}
    });

    this.bill.selling_amount=this.bill.selling_amount+additional_service_price;

    
    this.formvalue.bill=this.bill;
    

    this.updateinfo();
    console.log(this.formvalue);
    return true;
  }





reset_room(){
	this.formvalue.room_size={size:'',base:0};
}


next(){





      if(this.formvalue.room_size.size==''){
        this.diginix.toast("Room size not selected.",500);
        return false;
      }

  this.updateinfo();
  localStorage.setItem('booking_data',JSON.stringify(this.formvalue));
  this.router.navigate(['/bookingreview'],{ queryParams: { } });
  



}




// some core but important functions 


msg:any;
  location:any={
      villa:"",
      street:"",
      area_name:"",
      area:0,
      city_name:"",
      city_id:0,
      lat:"",
      lng:"",
      area_info:{name:''},
      city_info:{name:''},
    };

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
      this.diginix.callapi("profile/recentaddress/","",{},false).then((d)=>{
        this.location=d;
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
this.location=data.address;
}

if(data.fetch_new_address){
  this.use_latest_address();
}

console.log(data);

}


delete_photo(inputname,i){
          this.formvalue[inputname].splice(i, 1);
          //alert(i);
}


capture_photo(inputname){

                    // if(this.formvalue[inputname]==undefined){
                    //           this.formvalue[inputname]=[];
                    // }

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
