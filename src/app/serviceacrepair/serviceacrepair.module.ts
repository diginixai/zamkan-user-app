import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceacrepairPageRoutingModule } from './serviceacrepair-routing.module';

import { ServiceacrepairPage } from './serviceacrepair.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceacrepairPageRoutingModule
  ],
  declarations: [ServiceacrepairPage]
})
export class ServiceacrepairPageModule {}
