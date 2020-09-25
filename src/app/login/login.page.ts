import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiginixService } from '../diginix.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	login:any={
	email:"nishant@diginixai.com",
	password:"carpenter",
	}

  x:any={api:''}

// for facebook login.
isLoggedIn = false;
users = { id: '', name: '', email: '', picture: { data: { url: '' } } };



  background = {
    backgroundImage: "url('./assets/purplebg.jpg')"
  };

  constructor(
  private fb: Facebook,
  private router: Router,
  public diginix:DiginixService,
  private route: ActivatedRoute,
  private googlePlus: GooglePlus,
  ) { 



// fb.getLoginStatus()
//   .then(res => {
//     console.log(res.status);
//     if (res.status === 'connect') {
//       this.isLoggedIn = true;
//       console.log('constructur says you are logged in');
//     } else {
//       this.isLoggedIn = false;
//       console.log('constructur says you are not logged in');
//     }
//   })
//   .catch(e => console.log(e));









  }

  ngOnInit() {





  this.route
      .queryParams
      .subscribe(params => {
        if(params.email){
        this.login.email=params.email;
        }
      });


  }

  signIn() {
    	this.diginix.callapi("login/login/",this.diginix.translate("Signing in...","تسجيل الدخول..."),{email:this.login.email,password:this.login.password}).then((d)=>{
    			console.log(d);
          this.x=d;
    			localStorage.setItem('user',JSON.stringify(this.x));
    			localStorage.setItem('api',this.x.api);
          this.router.navigate(['/home'],{ queryParams: { } });

    		}).catch((e)=>{ console.log(e); });


  }



  googleSignIn() {
    this.googlePlus.login({})
      .then((result) => { console.log(result);

        var jsonDATA = {
          "email":result.email,
          "provider_id":result.userId,
          "provider_type":'google',
          "first_name":result.givenName,
          "last_name": '',
          "ionicapp":'true'
          }

          this.init_third_party_login(jsonDATA);




       })
      .catch((err) => { console.log(err); });
  }




  /* facebook login functions */

  fbLogin() {
  this.fb.login(['public_profile', 'user_friends', 'email'])
    .then(res => {
      if (res.status === 'connected') {
        this.isLoggedIn = true;
        this.fb_getUserDetail(res.authResponse.userID);


      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log('Error logging into Facebook', e));
}

fb_getUserDetail(userid: any) {
  this.fb.api('/' + userid + '/?fields=id,email,name,picture', ['public_profile'])
    .then(res => {
      console.log(res);
      this.users = res;


           var jsonDATA = {
          "email":this.users.email,
          "provider_id":this.users.id,
          "provider_type":'facebook',
          "first_name":this.users.name,
          "last_name": '',
          "ionicapp":'true'
          }


          this.init_third_party_login(jsonDATA);




    })
    .catch(e => {
      console.log(e);
    });
}


fb_logout() {
  this.fb.logout()
    .then( res => this.isLoggedIn = false)
    .catch(e => console.log('Error logout from Facebook', e));
    console.log('logged out to facebook');
}




init_third_party_login(data){

  let dx:any={api:''};

          this.diginix.callapi("login/social_authenticate/",this.diginix.translate("Signing in...","تسجيل الدخول..."),data,false).then((d)=>{
            dx=d;
            console.log('zamkanportal callback on facebook signin',d);
            localStorage.setItem('user',JSON.stringify(dx));
            localStorage.setItem('api',dx.api);
            this.router.navigate(['/home'],{ queryParams: { } });

          });


}


change_language(){
  this.diginix.language_switch();
}

}
