import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddresslistPage } from '../addresslist/addresslist.page';
import { BookingreviewPage } from '../bookingreview/bookingreview.page';
import { WhatincludedPage } from '../whatincluded/whatincluded.page';
import { DiginixService } from '../diginix.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-servicemattresscleaning',
  templateUrl: './servicemattresscleaning.page.html',
  styleUrls: ['./servicemattresscleaning.page.scss'],
})
export class ServicemattresscleaningPage implements OnInit {

time:any;

mattress_qty=0;  
mattress:any=[];
  mattress_content_loop=[
  {title:'Mattress 1',title_ar:'',size:'baby_size',type:'shampoo_cleaning',display:true},
  {title:'Mattress 2',title_ar:'',size:'baby_size',type:'shampoo_cleaning',display:true},
  {title:'Mattress 3',title_ar:'',size:'baby_size',type:'shampoo_cleaning',display:true},
  {title:'Mattress 4',title_ar:'',size:'baby_size',type:'shampoo_cleaning',display:true},
  {title:'Mattress 5',title_ar:'',size:'baby_size',type:'shampoo_cleaning',display:true},
  {title:'Mattress 6',title_ar:'',size:'baby_size',type:'shampoo_cleaning',display:true},
  {title:'Mattress 7',title_ar:'',size:'baby_size',type:'shampoo_cleaning',display:true},
  {title:'Mattress 8',title_ar:'',size:'baby_size',type:'shampoo_cleaning',display:true},
  {title:'Mattress 9',title_ar:'',size:'baby_size',type:'shampoo_cleaning',display:true},
 {title:'Mattress 10',title_ar:'',size:'baby_size',type:'shampoo_cleaning',display:true}
  ]


pillow_qty=0;  
pillow:any=[];
  pillow_content_loop=[
  {title:'Pillow 1',title_ar:'',type:'shampoo_cleaning',display:true},
  {title:'Pillow 2',title_ar:'',type:'shampoo_cleaning',display:true},
  {title:'Pillow 3',title_ar:'',type:'shampoo_cleaning',display:true},
  {title:'Pillow 4',title_ar:'',type:'shampoo_cleaning',display:true},
  {title:'Pillow 5',title_ar:'',type:'shampoo_cleaning',display:true},
  {title:'Pillow 6',title_ar:'',type:'shampoo_cleaning',display:true},
  {title:'Pillow 7',title_ar:'',type:'shampoo_cleaning',display:true},
  {title:'Pillow 8',title_ar:'',type:'shampoo_cleaning',display:true},
  {title:'Pillow 9',title_ar:'',type:'shampoo_cleaning',display:true},
 {title:'Pillow 10',title_ar:'',type:'shampoo_cleaning',display:true}
  ]

  formvalue={
  	room_type:"apartment",
  	room_size:{size:'',base:0},
  	room_furnished:"no",
    form_id:0,
    form_type:'booking',
  	step:1,  // one for main form, two for second input, three for location
    booking_type:"Sofa Cleaning",
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



  constructor(
  private route: ActivatedRoute,
  	private router: Router,
  	public modalController: ModalController,
    public diginix:DiginixService,
    private camera: Camera,
    ) { 

  	this.updqty_mattress(this.mattress_qty);
  	this.updqty_pillow(this.pillow_qty);
     this.use_latest_address();



  }

updqty_mattress(x){

	this.mattress_qty=x;
	for(var i=0;i<=9;i++){
		if(i>x-1){
			console.log(i,'hide from here');
			this.mattress_content_loop[i].display=false;
		}else{
			console.log(i,'show from here');
			this.mattress_content_loop[i].display=true;
		}
		
	
	}

	this.calculate();

}


updqty_pillow(x){

	this.pillow_qty=x;
	for(var i=0;i<=9;i++){
		if(i>x-1){
			console.log(i,'hide from here');
			this.pillow_content_loop[i].display=false;
		}else{
			console.log(i,'show from here');
			this.pillow_content_loop[i].display=true;
		}
		
	
	}

	this.calculate();

}


   ngOnInit() {


  //  this.diginix.alert('thankyou','nishant');

  let received_dt:any={form_id:null,time:[""],what_included:"",rate:{tax:0,additional:null,materials:[],hours:[],cleaners:[]}};

    this.diginix.callapi("newpriceapis/mattresscleaning","Loading only...",{service_id:77}).then((d)=>{
      
      received_dt=d;

      this.mattress=received_dt.rate.mattress;
	  this.pillow=received_dt.rate.pillow;

console.log(this.mattress);

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

    var date = new Date(this.formvalue.booking_date);
    this.formvalue.booking_date_human=date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();


    

    this.formvalue.booking_details=[];




    this.formvalue.booking_details.push(
     {
        'title':'Type of House',
        'title_ar':'سيفا كي أفادي',
        'value':this.formvalue.room_type,
      });

if(this.mattress_qty==0){

	this.formvalue.booking_details.push({
        'title':'Mattress',
        'title_ar':'صوفا '+(i+1)+' مقاعد',
        'value':'No',
      });

}else{

    for(var i=0;i<this.mattress_qty;i++){
    	this.formvalue.booking_details.push({
        'title':'Mattress '+(i+1),
        'title_ar':'Mattress '+(i+1),
        'value':this.mattress_content_loop[i].size+', '+this.mattress_content_loop[i].type,
      });
    }
}




if(this.pillow_qty==0){

	this.formvalue.booking_details.push({
        'title':'Pillow',
        'title_ar':'وسادة',
        'value':'No',
      });

}else{

    for(var i=0;i<this.pillow_qty;i++){
    	this.formvalue.booking_details.push({
        'title':'Pillow '+(i+1),
        'title_ar':(i+1)+'وسادة',
        'value':this.pillow_content_loop[i].type,
      });
    }
}





      this.formvalue.booking_details.push({
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
      });
 
console.log(this.formvalue);
  }



 calculate(){
    //console.log(this.formvalue);

    this.updateinfo();
    
    this.bill.printed_amount=0;
    this.bill.selling_amount=0;

    for(var i=0;i<this.mattress_qty;i++){
    	console.log('here here',i);
    	var type=this.mattress_content_loop[i].type;
    	var size=this.mattress_content_loop[i].size;

    	this.mattress.forEach((value, key, index) => {
    		if(value.size==size){
    			this.bill.printed_amount+=value[type].base_printed;
    			this.bill.selling_amount+=value[type].base_selling;
    		}
    	});

    }





    for(var i=0;i<this.pillow_qty;i++){
    	console.log('here here',i);
    	var type=this.pillow_content_loop[i].type;
    			this.bill.printed_amount+=this.pillow[type].base_printed;
    			this.bill.selling_amount+=this.pillow[type].base_selling;
    }




    this.formvalue.bill=this.bill;
    

    this.updateinfo();
   // console.log(this.formvalue);
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
