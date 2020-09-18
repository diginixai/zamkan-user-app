import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DiginixService } from '../diginix.service';

@Component({
  selector: 'app-addresslist',
  templateUrl: './addresslist.page.html',
  styleUrls: ['./addresslist.page.scss'],
})
export class AddresslistPage implements OnInit {
	
	newaddress_block=false;

	add_address={
		nickname:"",
		city_id:"",
		area_id:"",
		street:"",
		villa:"",
		lat:"",
		lng:"",
		city_info:"",
		area_info:"",
	}

	address_history:any=[];

        cities:any;
        areas:any;

  constructor(public modalController: ModalController,public diginix:DiginixService,) {








  }

  ngOnInit() {

  }

  ionViewDidEnter(){

        this.diginix.callapi("profile/addresslist/","",{},false).then((d)=>{
        this.address_history=d;
        });

        this.diginix.callapi("data/cities/","",{},false).then((d)=>{
        this.cities=d;
        });

        console.log('selectedcity',this.diginix.selected_city.id);
        this.add_address.city_id=this.diginix.selected_city.id;
        this.populate_area();
        // now getting area lists by suggestions 




  }


  populate_area(){
        var city_id=this.add_address.city_id;
        if(city_id!="" && city_id!=undefined){
        this.diginix.callapi("data/area/?id="+city_id,"Ferching Areas...",{}).then((d)=>{
        this.areas=d;
        this.add_address.area_id=d[0].areaId;
        }).catch((e)=>{});
        }

  }

  dismiss(dt) {
    this.modalController.dismiss({
      address:dt,
    });
  }

  closemodal(){
  	this.modalController.dismiss({});
  }

  passnew_adr(){
  	this.modalController.dismiss({
      address:this.add_address,
    });
  }

  add_new_address(){


      this.diginix.callapi("profile/addaddress/","Saving new address...",this.add_address).then((d)=>{
        
        this.modalController.dismiss({
          fetch_new_address:'ok doing.',
        });

      }).catch((e)=>{});
    


  }

}
