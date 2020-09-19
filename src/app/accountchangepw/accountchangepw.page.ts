import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiginixService } from '../diginix.service';

@Component({
  selector: 'app-accountchangepw',
  templateUrl: './accountchangepw.page.html',
  styleUrls: ['./accountchangepw.page.scss'],
})
export class AccountchangepwPage implements OnInit {

	change:any={
		old:'',pw1:'',pw2:''
	}

  constructor(private router: Router,public diginix:DiginixService,) { }

  ngOnInit() {
  }








update(){

  	if(this.change.old==""){
  		this.diginix.toast(this.diginix.translate("Old Password is missing..","كلمة المرور القديمة مفقودة."),300);
  		return false;
  	}


  	if(this.change.pw1==""){
  		this.diginix.toast(this.diginix.translate("New Password is missing..","كلمة المرور الجديدة مفقودة .."),300);
  		return false;
  	}




  	if(this.change.pw1!=this.change.pw2){
  		this.diginix.toast(this.diginix.translate("New password is not matching.","كلمة المرور الجديدة غير مطابقة."),300);
  		return false;
  	}






  		this.diginix.callapi("profile/updatepw/",this.diginix.translate("Updating Profile...","تحديث الملف الشخصي"),this.change,false).then((d)=>{
      

  				 this.diginix.alert("",this.diginix.translate("Your password has changed.","تم تغيير كلمة المرور الخاصة بك."));
  				 this.change={old:'',pw1:'',pw2:''}


        }).catch((e)=>{});




  }





}
