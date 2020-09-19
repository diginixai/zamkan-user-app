import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DiginixService } from '../diginix.service';



@Component({
  selector: 'app-accountaddressmanage',
  templateUrl: './accountaddressmanage.page.html',
  styleUrls: ['./accountaddressmanage.page.scss'],
})
export class AccountaddressmanagePage implements OnInit {

	address_history:any=[];


  constructor(public modalController: ModalController,public diginix:DiginixService,public alertController: AlertController) { }

  ngOnInit() {

  	this.sync_my_address();

  }


  sync_my_address(){

  	this.diginix.callapi("profile/addresslist/","",{},false).then((d)=>{
        this.address_history=d;
        });

  }






   async confirmbox(id) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.diginix.translate('Confirm!','تؤكد'),
      message: this.diginix.translate('Do you want to remove this address?','هل تريد إزالة هذا العنوان؟'),
      buttons: [
        {
          text: this.diginix.translate('No','لا'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: this.diginix.translate('Yes','نعم'),
          role: '',
          handler: () => {
            


          		this.diginix.callapi("profile/removeaddress/",this.diginix.translate("Deleting Address","حذف العنوان"),{id:id},false).then((d)=>{
        			this.sync_my_address();
        	}).catch((e)=>{});










          }
        }
      ]
    });

    await alert.present();
  }


}
