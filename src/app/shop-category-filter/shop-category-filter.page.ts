import { Animation, AnimationController, NavParams } from '@ionic/angular';
import { Component, OnInit,NgModule,ViewChild, AfterViewInit,Input  } from '@angular/core';
import { Router } from '@angular/router';
import { DiginixService } from '../diginix.service';
import { MenuController,ModalController }  from '@ionic/angular';
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';

@Component({
  selector: 'app-shop-category-filter',
  templateUrl: './shop-category-filter.page.html',
  styleUrls: ['./shop-category-filter.page.scss'],
})
export class ShopCategoryFilterPage implements OnInit {
  categoryFilter:FormGroup;
  public msg ="";
    catList:any;
    filters:[];
  constructor(private router: Router,
    public diginix:DiginixService,
    public modalCtrl:ModalController,
    public menu: MenuController,
    private formBuilder: FormBuilder,
    private navParams: NavParams) { 
      
     
     this.catList = this.navParams.get('list');
      console.log('check modla list',this.catList[0]);
       
    }

  ngOnInit() {

    this.categoryFilter = this.formBuilder.group({
      cat: this.formBuilder.array([]),
      });
  }
  get f() { return this.categoryFilter.controls; }


  async submitFilters(catId: string, isChecked: boolean, type:string){

    console.log('check submit filter');
    const catElementArray = <FormArray>this.categoryFilter.controls.cat;
    if (type == 'cat') {
        if (isChecked) {
          catElementArray.push(new FormControl(catId));
        } else {
          let index = catElementArray.controls.findIndex(x => x.value == catId)
          catElementArray.removeAt(index);
        }
    }
   this.filters= catElementArray.value

   
}

  closeModal() {
    this.modalCtrl.dismiss(this.filters);
 }

}
