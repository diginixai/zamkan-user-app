import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicebookatruckPageRoutingModule } from './servicebookatruck-routing.module';

import { ServicebookatruckPage } from './servicebookatruck.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicebookatruckPageRoutingModule
  ],
  declarations: [ServicebookatruckPage]
})
export class ServicebookatruckPageModule {}
