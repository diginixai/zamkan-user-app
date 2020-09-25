import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiginixService } from '../diginix.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

	user:any={};
	

  constructor(private router: Router,public diginix:DiginixService,) { 

    this.user=JSON.parse(localStorage.getItem("user"));
    
   }

  ngOnInit() {

  	this.user=JSON.parse(localStorage.getItem("user"));
  	

  }

  term_conditions(){
    window.open('https://test.zamkanapp.com/cms/page/v/termcondition/', '_system', 'location=yes');
    return false;
  }

  payment_refund(){
    window.open('https://test.zamkanapp.com/cms/page/v/refund/', '_system', 'location=yes');
    return false;
  }

  privacy_policy(){
    window.open('https://test.zamkanapp.com/cms/page/v/privacy/', '_system', 'location=yes');
    return false;
  }

  review_app_link(){
    window.open('https://play.google.com/store/apps/details?id=com.google.android.googlequicksearchbox', '_system', 'location=yes');
    return false;
  }

  support(){
    window.open('whatsapp://send?phone=+971585922350', '_system', 'location=yes');
    return false;
  }

  signout(){
    localStorage.removeItem('user');
    localStorage.removeItem('api');
    this.router.navigate(['/login'],{ queryParams: {boot:true} });

  }


  not_working(){
    this.diginix.toast(this.diginix.translate("This feature is currently under development.","هذه الميزة هي حاليا قيد التطوير."),300)
  }

}
 