import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DiginixService } from '../diginix.service';

@Component({
  selector: 'app-bookingreview',
  templateUrl: './bookingreview.page.html',
  styleUrls: ['./bookingreview.page.scss'],
})
export class BookingreviewPage implements OnInit {

	booking_data:any;
	
  constructor(
  public modalController: ModalController,
  private route: ActivatedRoute,
  private router: Router,
  public diginix:DiginixService,

    ) { 
    this.booking_data=JSON.parse(window.localStorage.getItem('booking_data'));
    console.log('testing',this.booking_data.booking_details);  
  }

  ngOnInit() {



  }

  closemodal(){
    //this.modalController.dismiss({});
    this.router.navigate(['/home'],{ queryParams: { } });
  }

  


  book_now(){ 
    this.diginix.toast(this.diginix.translate("Payment connection is under process.","اتصال الدفع قيد المعالجة."),300);
    this.diginix.callapi("bookingsocket/submit/","Sending Booking",this.booking_data).then((d)=>{

    });
  }

  
}
