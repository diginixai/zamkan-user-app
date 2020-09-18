import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { DiginixService } from './diginix.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
   private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public diginix:DiginixService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    
    this.diginix.callapi("data/cities/","",{},false).then((d)=>{
          localStorage.setItem('cities',JSON.stringify(d));
          this.diginix.cities=d;

          if(localStorage.getItem('selected_city')!=undefined){
            this.diginix.selected_city=JSON.parse(localStorage.getItem('selected_city'));
            console.log('from localstorage',this.diginix.selected_city)
          }else{
            this.diginix.selected_city={id:0,name:"Select City",name_ar:"اختر مدينة"};
            this.diginix.city_selector();
          }



          this.platform.ready().then(() => {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
           });



        }).catch((e)=>{ 

          //this.router.navigate(['/login'],{ queryParams: {boot:true} });

         });



      

  }
}
