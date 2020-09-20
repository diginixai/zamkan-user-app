import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DiginixService {

apiurl="https://test.zamkanapp.com/api/";
run="angular";
language="en";
cities:any=[];
selected_city:any={id:"",name:"",name_ar:""};
  




  
// 
  constructor(  
    private platform: Platform,
    private http: HttpClient, // for angular request
    private nativehttp: HTTP,
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    public toastController: ToastController,
    public actionSheetController: ActionSheetController,
  ){  



if(this.platform.is("android")==true){
  this.run="native";
}

if(this.platform.is("ios")==true){
  this.run="native";
}

if(this.platform.is("ios")==true){
  this.run="native";
}



this.cities=JSON.parse(window.localStorage.getItem('cities'));


var lang=window.localStorage.getItem('language');
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
          window.localStorage.setItem("language","en");
          document.documentElement.dir = "ltr";
          this.language="en";
        }
      }, {
        text: 'عربى',
        icon: '',
        role: 'destructive',
        handler: () => {
          window.localStorage.setItem("language","ar");
          document.documentElement.dir = "rtl";
          this.language="ar";
        }
      },]
    });
    await actionSheet.present();
  }


open_external_url(url){
window.open(url, '_system', 'location=yes');
    return false;
}




  async city_selector() {

    let ct=[];

     this.cities.forEach((value, key, index) => {


          ct.push({
        text: this.translate(value.name,value.name_ar),
        role: 'destructive',
        icon: '',
        handler: () => {
          window.localStorage.setItem("selected_city",JSON.stringify(value));
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

console.log('feftching url',url);

  const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
        message: msg,
    });




  if(this.run=="native"){

    console.log('native api request run initiated');
 var p = new Promise ((resolve,reject)=>{
                 if(msg!=''){
                  loading.present();
                    }
                 var link=this.apiurl+url;
                 this.nativehttp.setHeader('*','api', localStorage.getItem('api'));
                 this.nativehttp.post(link,data,{}).then(dataxx => {
                  console.log('http request sent',dataxx);
                                  try {
                                      var tcson=JSON.parse(dataxx.data);
                                      console.log(tcson);
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




}else{







 var p = new Promise ((resolve,reject)=>{


   console.log('angular api request run initiated');

                 if(msg!=''){
                  loading.present();
                    }
                 var link=this.apiurl+url;


                if(localStorage.getItem('api')!=undefined){
                  var httpOptions = {
                    headers: new HttpHeaders({
                      'Content-Type': 'application/json',
                      'api':localStorage.getItem('api'),
                      'demodata':'fineok',
                    })
                  }
                }else{
                  var httpOptions = {
                    headers: new HttpHeaders({
                      'Content-Type': 'application/json',
                      'api':'',
                      'demodata':'fineok',
                    })
                  }
                }


                 this.http.post(link,data,httpOptions).subscribe(dataxx => {

                  console.log('http request sent',dataxx);
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

                console.log(err);
                   loading.dismiss();
                  this.alert(this.translate("Technical Error","خطأ تقني"),this.translate("Technical Error in connection.","خطأ فني في الاتصال."));
                  reject("");
              }

     );

        


}); 














}





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
