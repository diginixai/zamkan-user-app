import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddresslistPage } from '../addresslist/addresslist.page';
import { BookingreviewPage } from '../bookingreview/bookingreview.page';
import { WhatincludedPage } from '../whatincluded/whatincluded.page';
import { DiginixService } from '../diginix.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-servicecarpetcleaning',
  templateUrl: './servicecarpetcleaning.page.html',
  styleUrls: ['./servicecarpetcleaning.page.scss'],
})
export class ServicecarpetcleaningPage implements OnInit {



qty=1;  
rates:any={
	shampoo_cleaning: {size: "sqm", base_selling: 0, base_printed: 0},
	steam_cleaning: {size: "sqm", base_selling: 0, base_printed: 0}
}
  
  time:any;
  content_loop=[
  {title:'Carpet 1',title_ar:'',width:'',length:'',scale:'cm',type:'shampoo_cleaning',display:true},
  {title:'Carpet 2',title_ar:'',width:'',length:'',scale:'cm',type:'shampoo_cleaning',display:true},
  {title:'Carpet 3',title_ar:'',width:'',length:'',scale:'cm',type:'shampoo_cleaning',display:true},
  {title:'Carpet 4',title_ar:'',width:'',length:'',scale:'cm',type:'shampoo_cleaning',display:true},
  {title:'Carpet 5',title_ar:'',width:'',length:'',scale:'cm',type:'shampoo_cleaning',display:true},
  {title:'Carpet 6',title_ar:'',width:'',length:'',scale:'cm',type:'shampoo_cleaning',display:true},
  {title:'Carpet 7',title_ar:'',width:'',length:'',scale:'cm',type:'shampoo_cleaning',display:true},
  {title:'Carpet 8',title_ar:'',width:'',length:'',scale:'cm',type:'shampoo_cleaning',display:true},
  {title:'Carpet 9',title_ar:'',width:'',length:'',scale:'cm',type:'shampoo_cleaning',display:true},
  {title:'Carpet 10',title_ar:'',width:'',length:'',scale:'cm',type:'shampoo_cleaning',display:true}
  ]

  formvalue={
  	room_type:"apartment",
  	room_size:{size:'',base:0},
  	room_furnished:"no",
    form_id:0,
    form_type:'booking',
  	step:1,  // one for main form, two for second input, three for location
    booking_type:"Carpet Cleaning",
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

  	this.updqty(this.qty);
     this.use_latest_address();



  }

updqty(x){

	this.qty=x;
	for(var i=0;i<=9;i++){
		if(i>x-1){
			console.log(i,'hide from here');
			this.content_loop[i].display=false;
		}else{
			console.log(i,'show from here');
			this.content_loop[i].display=true;
		}
		
	
	}

	this.calculate();

}


dimension_scale(w,h,scale){

if(w==undefined || h==undefined){
	return 0;
}

if(w==""){ return 0; }
if(h==""){ return 0; }

var ar=w*h;
if(ar==0){
	return 0;
}

if(scale=="cm"){
	return Math.ceil(ar/10000);
}

if(scale=="feet"){
	return Math.ceil(ar/10.764);
}

if(scale=="inches"){
	return Math.ceil(ar/1550);
}

return 0;

}




   ngOnInit() {


  //  this.diginix.alert('thankyou','nishant');

  let received_dt:any={form_id:null,time:[""],what_included:"",rate:{tax:0,additional:null,materials:[],hours:[],cleaners:[]}};

    this.diginix.callapi("newpriceapis/carpetcleaning","Loading only...",{service_id:77}).then((d)=>{
      
      received_dt=d;

      this.rates.shampoo_cleaning=received_dt.rate.shampoo_cleaning;
	  this.rates.steam_cleaning=received_dt.rate.steam_cleaning;



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


    for(var i=0;i<this.qty;i++){
    	var area=this.dimension_scale(this.content_loop[i].width,this.content_loop[i].length,this.content_loop[i].scale);
    	this.formvalue.booking_details.push({
        'title':'Carpet '+(i+1)+' Size',
        'title_ar':'سجادة مقاس '+(i+1),
        'value':this.content_loop[i].width+this.content_loop[i].scale+' x '+this.content_loop[i].length+this.content_loop[i].scale,
      });
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

    for(var i=0;i<this.qty;i++){
    	console.log('here here',i);
    	var sel=this.content_loop[i].type;
    	var rate_selling=this.rates[sel].base_selling;
    	var rate_printed=this.rates[sel].base_printed;
    	var area=this.dimension_scale(this.content_loop[i].width,this.content_loop[i].length,this.content_loop[i].scale);
    	console.log('carpet index :'+i,area,rate_printed);
		this.bill.printed_amount=this.bill.printed_amount+ ( area*rate_printed );
    	this.bill.selling_amount=this.bill.selling_amount+ ( area*rate_selling );
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


	for(var i=0;i<this.qty;i++){
    	var area=this.dimension_scale(this.content_loop[i].width,this.content_loop[i].length,this.content_loop[i].scale);
    	if(area==0){

    		this.diginix.toast("Carpet "+(i+1)+" Dimentions are incorrect or not provided.",500);
        	return false;
    	}
    }



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
