import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiginixService } from '../diginix.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	login:any={
	email:"admin@zamkanapp.com",
	password:"carpenter",
	}

  x:any={api:''}



  background = {
    backgroundImage: "url('./assets/purplebg.jpg')"
  };

  constructor(
  private router: Router,
  public diginix:DiginixService,
  private route: ActivatedRoute,
  ) { }

  ngOnInit() {


  // window.localStorage.deleteItem('api');
  // window.localStorage.deleteItem('user');


  



  this.route
      .queryParams
      .subscribe(params => {
        if(params.email){
        this.login.email=params.email;
        }
      });


  }

  signIn() {
    	this.diginix.callapi("login/login/","Signing in...",{email:this.login.email,password:this.login.password}).then((d)=>{
    			console.log(d);
          this.x=d;
    			window.localStorage.setItem('user',JSON.stringify(this.x));
    			window.localStorage.setItem('api',this.x.api);
          this.router.navigate(['/home'],{ queryParams: { } });

    		}).catch((e)=>{ console.log(e); });


  }


}
