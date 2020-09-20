import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiginixService } from '../diginix.service';

@Component({
  selector: 'app-accountprofileedit',
  templateUrl: './accountprofileedit.page.html',
  styleUrls: ['./accountprofileedit.page.scss'],
})
export class AccountprofileeditPage implements OnInit {
 
	user:any={city_id:'0',area_id:'7'};
	city_list:any=[];
	area_list:any=[];
  default_area="0";
  
	api=localStorage.getItem('api');

  constructor(private router: Router,public diginix:DiginixService,) { }

  ngOnInit() {

  	this.user=JSON.parse(localStorage.getItem("user"));
  	this.city_list=JSON.parse(localStorage.getItem("cities"));
    this.default_area=this.user.area_id;
    this.populate_area();
    console.log(this.user);

  	

  }


    populate_area(){
        if(this.user.city_id!="" && this.user.city_id!=undefined){
        this.diginix.callapi("data/area/?id="+this.user.city_id,"Ferching Areas...",{}).then((d)=>{
         

         this.area_list=d;

         console.log(this.area_list);
         this.default_area=this.user.area_id;
        

        }).catch((e)=>{});
        }
  }

  update(){

  	console.log(this.user);

  	var push_data={
  		name:this.user.name,
  		last_name:this.user.last_name,
  		villa:this.user.villa,
  		street:this.user.street,
  		city_id:this.user.city_id,
  		area:this.default_area,
  		mobile:this.user.mobile,
  		id_proof:this.user.id_proof,
  		certificate:this.user.certificate,
  	}

console.log("this is pushing",push_data);
  	if(push_data.name==""){
  		this.diginix.toast(this.diginix.translate("First Name is missing.","الاسم الأول مفقود."),300);
  		return false;
  	}


  	if(push_data.last_name==""){
  		this.diginix.toast(this.diginix.translate("Last Name is missing.","الاسم الأخير مفقود."),300);
  		return false;
  	}






  		this.diginix.callapi("profile/update/",this.diginix.translate("Updating Profile...","تحديث الملف الشخصي"),push_data,false).then((d)=>{
       



  				this.diginix.callapi("profile/profileinfo/","",{api:this.api},true).then((d)=>{
	              
	              localStorage.setItem("user",JSON.stringify(d));
	              
	              this.diginix.alert("",this.diginix.translate("Your profile is updated.","يتم تحديث ملف التعريف الخاص بك."));
	            }).catch((e)=>{});






        }).catch((e)=>{});




  }


}
