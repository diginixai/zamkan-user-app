import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DiginixService } from '../diginix.service';

@Component({
  selector: 'app-bookingdetail',
  templateUrl: './bookingdetail.page.html',
  styleUrls: ['./bookingdetail.page.scss'],
})
export class BookingdetailPage implements OnInit {

  booking_id:any;
  booking:any={};

  constructor(
  public modalController: ModalController,
  private route: ActivatedRoute,
  private router: Router,
  public diginix:DiginixService,
  ) { }

  ngOnInit() {


  	 this.route.queryParams
      .subscribe(params => {
      	
       // this.name=params.name;
       if(params.id){
       this.booking_id=params.id;

       this.diginix.callapi("profile/booking_info/",this.diginix.translate("Loading booking information...","جارٍ تحميل معلومات الحجز ..."),{booking_id:this.booking_id},false).then((d)=>{ this.booking=d; });

       
   		}
      });



  	

  }

}
