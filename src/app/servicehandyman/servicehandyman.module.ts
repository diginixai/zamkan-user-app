import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicehandymanPageRoutingModule } from './servicehandyman-routing.module';

import { ServicehandymanPage } from './servicehandyman.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicehandymanPageRoutingModule
  ],
  declarations: [ServicehandymanPage]
})
export class ServicehandymanPageModule {}
