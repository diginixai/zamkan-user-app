import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiginixService } from '../diginix.service';

@Component({
  selector: 'app-boot',
  templateUrl: './boot.page.html',
  styleUrls: ['./boot.page.scss'],
})
export class BootPage implements OnInit {

  constructor(private router: Router,
  public diginix:DiginixService,
  private route: ActivatedRoute,) { 

  


  }

  ngOnInit() {




var api=localStorage.getItem('api');
  if(api===undefined){
      this.router.navigate(['/login'],{ queryParams: {boot:true} });
  }else{
console.log('validation is complete moving forward',api);

      this.diginix.callapi("login/validate/","",{api:api},true).then((d)=>{
          localStorage.setItem('user',JSON.stringify(d));
              this.router.navigate(['/home'],{ queryParams: { } });

        }).catch((e)=>{ 
          this.router.navigate(['/login'],{ queryParams: {boot:true} });
         });
  }






  }

}
