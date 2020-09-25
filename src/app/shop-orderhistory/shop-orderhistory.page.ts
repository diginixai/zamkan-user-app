import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiginixService } from '../diginix.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-shop-orderhistory',
  templateUrl: './shop-orderhistory.page.html',
  styleUrls: ['./shop-orderhistory.page.scss'],
})
export class ShopOrderhistoryPage implements OnInit {

  current_segment="new";
  data:any=[];

  constructor(private router: Router,
            public diginix:DiginixService,
            public actionSheetController: ActionSheetController,) {

             }

             ngOnInit() {

              this.getOrders(this.current_segment);
          
            }
          
            
            getOrders(type){
             let keyword={
              keyword:type
             }
          
              this.diginix.callapi('user/get_customer_orders',this.diginix.translate('Collecting Data...','جمع البيانات..'),keyword,true).then((d)=>{
          
                  this.data=d;
                  console.log('datatatata',d);
          
              })
          
          
          
            }
          
          async pop_option(order){
          
          
          
          const actionSheet = await this.actionSheetController.create({
                header:this.diginix.translate('Action','خيارات'),
                cssClass: 'my-custom-class',
                buttons: [{
                  text: this.diginix.translate('Cancel this order','إلغاء هذا الطلب'),
                  role: 'destructive',
                  icon: 'trash',
                  handler: () => {
                    
                      this.diginix.callapi("user/change_order_status",this.diginix.translate('Cancelling this order.','إلغاء هذا الطلب'),{id:order.id,'status':'cancelled'},false).then((d)=>{
          
          
                          this.diginix.alert("",this.diginix.translate('Your order has been cancelled.','تم إلغاء طلبك.'));
                          this.getOrders(this.current_segment);
          
                      });
          
          
          
          
          
                  }
                },
                //  {
                //   text: this.diginix.translate('Pay for this booking','ادفع لهذا الحجز'),
                //   icon: 'cash-outline',
                //   handler: () => {
                //     this.diginix.toast(this.diginix.translate('This feature is not available now.','هذه الميزة غير متوفرة الآن.'),300);
                //   }
                // },
                {
                  text: this.diginix.translate('Talk to support','تحدث إلى الدعم'),
                  icon: 'logo-whatsapp',
                  handler: () => {
          
                    var url="https://wa.me/971585922350?text=I%20need%20help%20for%20my%20booking%20%23"+order.id;
                    window.open(url, '_system', 'location=yes');
                  }
                }, {
                  text: this.diginix.translate('Update Order','أجل التحديث'),
                  icon: 'swap-horizontal-outline',
                  handler: () => {
                    //console.log('Update Booking');
                  }
                }, {
                  text: this.diginix.translate('See order details','انظر تفاصيل الطلب'),
                  icon: 'information-circle-outline',
                  handler: () => {
                    this.getOrderDetail(order);
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
          
          
            getOrderDetail(order){
              localStorage.setItem('zamakan_orderdetail',JSON.stringify(order));
              this.router.navigate(['/orderdetail',order.id]);
            }

}
