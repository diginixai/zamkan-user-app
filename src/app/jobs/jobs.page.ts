import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiginixService } from '../diginix.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {

  constructor(private router: Router,public diginix:DiginixService,public actionSheetController: ActionSheetController,) { }

  current_segment="upcoming";
  data:any=[];

  ngOnInit() {

    this.load_booking();

  }

  sc(){
  	console.log(this.current_segment);
  }




  load_booking(){
    var api_url="profile/booking";
    
    if(this.current_segment=="upcoming"){
      api_url="profile/upcomingbooking";
    }

    if(this.current_segment=="old"){
      api_url="profile/pastbooking";
    }

    if(this.current_segment=="cancelled"){
      api_url="profile/cancelledbooking";
    }

    this.diginix.callapi(api_url,this.diginix.translate('Collecting Data...','جمع البيانات..'),{},false).then((d)=>{

        this.data=d;

    })



  }

async pop_option(booking){



const actionSheet = await this.actionSheetController.create({
      header:this.diginix.translate('Action','خيارات'),
      cssClass: 'my-custom-class',
      buttons: [{
        text: this.diginix.translate('Cancel this booking','إلغاء هذا الحجز'),
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          
            this.diginix.callapi("profile/cancelbooking",this.diginix.translate('Cancelling this booking.','إلغاء هذا الحجز.'),{booking_id:booking.id},false).then((d)=>{


                this.diginix.alert("",this.diginix.translate('Your booking has cancelled.','تم إلغاء حجزك.'));
                this.load_booking();

            });





        }
      }, {
        text: this.diginix.translate('Pay for this booking','ادفع لهذا الحجز'),
        icon: 'cash-outline',
        handler: () => {
          this.diginix.toast(this.diginix.translate('This feature is not available now.','هذه الميزة غير متوفرة الآن.'),300);
        }
      },
      {
        text: this.diginix.translate('Talk to support','تحدث إلى الدعم'),
        icon: 'logo-whatsapp',
        handler: () => {

          var url="https://wa.me/971585922350?text=I%20need%20help%20for%20my%20booking%20%23"+booking.booking_code;
          window.open(url, '_system', 'location=yes');
        }
      }, {
        text: this.diginix.translate('Update Booking','تحديث الحجز'),
        icon: 'swap-horizontal-outline',
        handler: () => {
          console.log('Update Booking');
        }
      }, {
        text: this.diginix.translate('Show Booking Information','إظهار معلومات الحجز'),
        icon: 'information-circle-outline',
        handler: () => {
          this.booking_info(booking.id);
        }
      },
      {
        text: this.diginix.translate('Close this dialogue','أغلق هذا الحوار'),
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }


      ]
    });
    await actionSheet.present();
  }


  booking_info(booking_id){
    this.router.navigate(['/bookingdetail'],{ queryParams: { id: booking_id } });
  }


}
 