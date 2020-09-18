import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DiginixService } from '../diginix.service';

@Component({
  selector: 'app-whatincluded',
  templateUrl: './whatincluded.page.html',
  styleUrls: ['./whatincluded.page.scss'],
})
export class WhatincludedPage implements OnInit {

  what_included:any = {image:'',title:'',subtitle:'',content:''}

  constructor(public modalController: ModalController,public diginix:DiginixService,) { }

  ngOnInit() {
  }

   closemodal(){
  	this.modalController.dismiss({});
  }

}
