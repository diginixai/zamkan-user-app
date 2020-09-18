import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiginixService } from '../diginix.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public diginix:DiginixService,private route: ActivatedRoute,
  	private router: Router,) { }

  signup:any={
  first_name:"",
  last_name:"",
  email:"",
  mobile:"",
  password:"",
  password2:"",
  city:"",
  referral:"",
  }

  register(){


  	if(this.signup.first_name.length<3){
  		this.diginix.toast("First name is too short.",300);
  		return false;
  	}

  	if(this.signup.last_name.length<3){
  		this.diginix.toast("Last name is too short.",300);
  		return false;
  	}

  	if(this.signup.email.length<3){
  		this.diginix.toast("Invalid email.",300);
  		return false;
  	}
  

  	if(this.signup.mobile.length<9){
  		this.diginix.toast("Mobile number is too short.",300);
  		return false;
  	}

  	if(this.signup.password.length<3){
  		this.diginix.toast("Password is too short.",300);
  		return false;
  	}

  	if(this.signup.password!=this.signup.password2){
  		this.diginix.toast("Password is invalid.",300);
  		return false;
  	}
  		this.diginix.callapi("login/register","Registering...",this.signup,true).then((d)=>{
  		this.diginix.alert("Thank you","Verification email sent, You can login using current password.");
  		this.router.navigate(['/login'],{ queryParams: { email: this.signup.email } });

	  	}).catch((e)=>{
	  		this.diginix.alert("Alert!",e);
	  	});




  }

  facebook_login(){
  	this.diginix.toast("Facebook login service is under maintenance.");
  }

  google_login(){
  	this.diginix.toast("Google Login Service is under maintenance");
  }

  ngOnInit() {
  }

}
