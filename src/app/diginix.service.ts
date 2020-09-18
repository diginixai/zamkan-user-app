import { Injectable } from '@angular/core';
import { Component } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class DiginixService {

apiurl="https://test.zamkanapp.com/api/";

language="en";
cities:any=[];
selected_city:any={id:"",name:"",name_ar:""};
  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'api':localStorage.getItem('api'),
      'demodata':'fineok',
    })
  }




  
// private http: HTTP,
  constructor(  
   private http: HttpClient,
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    public toastController: ToastController,
    public actionSheetController: ActionSheetController,
  ){  


console.log('getapi--diginixtsl;k',localStorage.getItem('api'));

this.cities=JSON.parse(localStorage.getItem('cities'));


var lang=localStorage.getItem('language');
if(lang==undefined){
  this.language="en";
  document.documentElement.dir = "ltr";
}else{
  this.language=lang;
      if(lang=="ar"){
      document.documentElement.dir = "rtl";
      }else{
      document.documentElement.dir = "ltr";
      }
}

  }




async language_switch() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Language / لغة',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'English',
        role: 'destructive',
        icon: '',
        handler: () => {
          localStorage.setItem("language","en");
          document.documentElement.dir = "ltr";
          this.language="en";
        }
      }, {
        text: 'عربى',
        icon: '',
        role: 'destructive',
        handler: () => {
          localStorage.setItem("language","ar");
          document.documentElement.dir = "rtl";
          this.language="ar";
        }
      },]
    });
    await actionSheet.present();
  }







  async city_selector() {

    let ct=[];

     this.cities.forEach((value, key, index) => {


          ct.push({
        text: this.translate(value.name,value.name_ar),
        role: 'destructive',
        icon: '',
        handler: () => {
          localStorage.setItem("selected_city",JSON.stringify(value));
          this.selected_city=value;
        }
      });
      });

     console.log(ct);
    const actionSheet = await this.actionSheetController.create({
      header: this.translate('Select City','اختر مدينة'),
      cssClass: 'my-custom-class',
      buttons: ct
    });
    await actionSheet.present();
  }







 async myMethod() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
        message: "hello class",
    });
   
  loading.present();
  loading.dismiss();
}






async callapi(url,msg="Loading",data={},silent=false){
  
  const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
        message: msg,
    });



 var p = new Promise ((resolve,reject)=>{



                 if(msg!=''){
                  loading.present();
                    }
                 var link=this.apiurl+url;
//this.httpOptions
                 this.http.post(link,data,this.httpOptions).subscribe(dataxx => {
                                  try {
                                      var tcson=dataxx;
                                      //var tcson=JSON.parse(dataxx['_body']);
                                      //console.log(tcson);
                                                if(tcson[0]==true){
                                                         loading.dismiss();
                                                          resolve(tcson[1]);
                                                }else{
                                                          loading.dismiss();

                                                          if(silent==false){
                                                          if(tcson[1]['route']!=undefined){
                                                               this.alert(this.translate("Please Login","الرجاء تسجيل الدخول"),this.translate("Please login your account","الرجاء تسجيل الدخول إلى حسابك"));
                                                             
                                                          }else{
                                    this.alert(this.translate("Technical Error","خطأ تقني"),JSON.stringify(tcson[1]));
                                                          }
                                                            }
                                                          reject(tcson[1]);

                                                }

                                  } catch (e) {
                                                   loading.dismiss();
                                                  this.alert(this.translate("Technical Error","خطأ تقني"),this.translate("Technical Server Error","خطأ في الخادم الفني"));
                                                  reject("");

                                  }

               },
               err => {
                   loading.dismiss();
                  this.alert(this.translate("Technical Error","خطأ تقني"),this.translate("Technical Error in connection.","خطأ فني في الاتصال."));
                  reject("");
              }

     );

        


}); 

return p;

}























 async alert(titles,texts){
   const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: titles,
      subHeader: '',
      message: texts,
      buttons: ['OK']
    });

    alert.present();

 }

 async toast(msg,duration=2000){

    const toast = await this.toastController.create({
      message: msg,
      duration: duration
    });
    toast.present();
 }


translate(english,arabic){

  if(arabic==""){
  return english;
  }

  if(this.language=="ar"){
    return arabic;
  }
  return english;
}






}
