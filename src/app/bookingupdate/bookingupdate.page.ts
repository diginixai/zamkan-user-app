import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DiginixService } from '../diginix.service';
import { AddresslistPage } from '../addresslist/addresslist.page';

@Component({
  selector: 'app-bookingupdate',
  templateUrl: './bookingupdate.page.html',
  styleUrls: ['./bookingupdate.page.scss'],
})
export class BookingupdatePage implements OnInit {

  booking_id:any;
  booking:any={area_info:{name:''},city_info:{name:''}};
  today=new Date().toISOString();
  location={
  		id:"",
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
    };

  constructor(public modalController: ModalController,
  private route: ActivatedRoute,
  private router: Router,
  public diginix:DiginixService,) { }

    ngOnInit() {


  	 this.route.queryParams
      .subscribe(params => {
      	
       // this.name=params.name;
       if(params.id){
       this.booking_id=params.id;

       this.diginix.callapi("profile/booking_info/",this.diginix.translate("Loading booking information...","جارٍ تحميل معلومات الحجز ..."),{booking_id:this.booking_id},false).then((d)=>{ 

       	this.booking=d;
       	this.location.area_info=this.booking.area_info;
       	this.location.city_info=this.booking.city_info;
       	this.location.villa=this.booking.address;
       	this.location.street=this.booking.address_2;


       	 });

       
   		}


      });


      //this.use_latest_address();
  	

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
this.location=data.address;
}

if(data.fetch_new_address){
  this.use_latest_address();
}

console.log(data);

}

update_booking(){
var req={
	id:this.booking.id,
	address:this.location.id,
	date:this.booking.date,
	time:this.booking.service_time,
}

this.diginix.callapi("booking/updateBooking",this.diginix.translate("Making Changes...","إجراء التغييرات ..."),req,false).then((d)=>{

	this.router.navigate(['/jobs'],{ queryParams: { id: this.booking.id } });

}).catch((e)=>{ });

}

use_latest_address(){      // fetch address 

  var dx:any={
  	  id:"",
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
        this.location=dx;
        }
      });
}


}
