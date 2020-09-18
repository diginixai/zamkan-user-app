import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiginixService } from '../diginix.service';

@Component({
  selector: 'app-forgetpw',
  templateUrl: './forgetpw.page.html',
  styleUrls: ['./forgetpw.page.scss'],
})
export class ForgetpwPage implements OnInit {

	reset:any={
	email:"",
	}

	background = {
    backgroundImage: 'url(https://test.zamkanapp.com/assets/ptheme/css/images/paper-grey-texture-wrinkled-wallpaper-preview.jpg)'
  };


  constructor(
  private router: Router,
  public diginix:DiginixService,
  private route: ActivatedRoute,) { }

  ngOnInit() {
  }


  resetpw() {
    	
    	this.diginix.callapi("login/forget","Validating...",this.reset,true).then((d)=>{
  		this.diginix.alert("Mail sent.","Please check your inbox and reset your password.");
  		this.router.navigate(['/login'],{ queryParams: { email: this.reset.email } });

	  	}).catch((e)=>{
	  		this.diginix.alert("Alert!",e);
	  	});


  }

}
